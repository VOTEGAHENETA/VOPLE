package com.votegaheneta.vote.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.votegaheneta.common.component.FileStorageComponent;
import com.votegaheneta.common.component.VoteResultCalculator;
import com.votegaheneta.stream.entity.Stream;
import com.votegaheneta.stream.repository.StreamRepository;
import com.votegaheneta.user.dto.UserDto;
import com.votegaheneta.user.entity.Users;
import com.votegaheneta.user.enums.USER_TYPE;
import com.votegaheneta.user.repository.UsersRepository;
import com.votegaheneta.vote.controller.response.SessionResponse;
import com.votegaheneta.vote.controller.response.SessionValidateResponse;
import com.votegaheneta.vote.dto.SessionDto;
import com.votegaheneta.vote.dto.SessionEditDto;
import com.votegaheneta.vote.dto.SessionEditDto.VoteEditInfo;
import com.votegaheneta.vote.dto.SessionInitialInfoDto;
import com.votegaheneta.vote.dto.SessionListDto;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult.TeamResult;
import com.votegaheneta.vote.entity.ElectionSession;
import com.votegaheneta.vote.entity.SessionUserInfo;
import com.votegaheneta.vote.entity.Vote;
import com.votegaheneta.vote.repository.ElectionRepository;
import com.votegaheneta.vote.repository.SessionUserInfoRepository;
import com.votegaheneta.vote.repository.VoteRepository;
import java.awt.image.BufferedImage;
import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.imageio.ImageIO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SessionServiceImpl implements SessionService {

  @Value("${base_url}")
  private String mediaUrl;

  private final ElectionRepository electionRepository;
  private final SessionUserInfoRepository sessionUserInfoRepository;
  private final UsersRepository usersRepository;
  private final VoteResultCalculator voteResultCalculator;
  private final FileStorageComponent fileStorageComponent;
  private final StreamRepository streamRepository;
  private final VoteRepository voteRepository;
  private final VoteCommandService voteCommandService;

  @Transactional
  @Override
  public Long saveSession(SessionDto sessionDto, UserDto userDto) {
    Users user = UserDto.toEntity(userDto);
    ElectionSession electionSession = sessionDto.toEntity(user);
    electionSession = electionRepository.save(electionSession);
    SessionUserInfo sessionUserInfo = new SessionUserInfo(user, electionSession);
    sessionUserInfoRepository.save(sessionUserInfo);
    // qr코드로 접속할 url
    String REQUEST_CACHE_QUERY = "?entrance";
    String url = mediaUrl + "/elections/" + electionSession.getId() + REQUEST_CACHE_QUERY;

    int width = 400;
    int height = 400;

    // qr코드 생성하는 코드
    try {
      BitMatrix encode = new MultiFormatWriter()
          .encode(url, BarcodeFormat.QR_CODE, width, height);

      BufferedImage qrCodeImage = MatrixToImageWriter.toBufferedImage(encode);

      String fileName = "qrcode_" + electionSession.getId() + ".png";
      String UPLOAD_DIR = "/app/uploads/";
      File qrCodeFile = new File(UPLOAD_DIR + "qrcode/", fileName);

      qrCodeFile.getParentFile().mkdirs();
      ImageIO.write(qrCodeImage, "png", qrCodeFile);
      String relativePath = mediaUrl + "/uploads" + "/qrcode/" + fileName;
      electionSession.setQrCode(fileStorageComponent.convertToRelativePath(relativePath));
      electionSession.setWholeVoter(electionSession.getWholeVoter() + 1);
      electionRepository.save(electionSession);
    } catch (Exception e) {
      throw new IllegalArgumentException("QR코드 생성에 실패했습니다.", e);
    }
    return electionSession.getId();
  }

  @Override
  public SessionInitialInfoDto getSession(Long sessionId, Long userId) {
    ElectionSession electionSession = electionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("해당되는 세션 정보가 없습니다."));
    List<VoteResult> voteResults = voteResultCalculator.calculateVoteResult(sessionId);
    Boolean IS_STREAMING = true;
    Set<Long> teamIds = voteResults.stream().flatMap(voteResult -> voteResult.getTeamResults().stream().map(
        TeamResult::getTeamId)).collect(Collectors.toSet());
    List<Stream> streams = streamRepository.findByTeamIds(teamIds);
    Set<Long> isStreamingIds = streams.stream().filter(Stream::isStreaming).map(Stream::getId).collect(Collectors.toSet());
    voteResults.stream()
        .flatMap(voteResult -> voteResult.getTeamResults().stream())
        .forEach(teamResult -> {
          if (isStreamingIds.contains(teamResult.getTeamId())) {
            teamResult.setIsStreaming(IS_STREAMING);
          }
        });
    SessionUserInfo sessionUserInfo = sessionUserInfoRepository.findBySessionIdAndUserId(sessionId, userId)
        .orElseThrow(() -> new IllegalArgumentException("투표 회원의 정보를 찾을 수 없습니다."));
    float wholeVoterPercent = electionSession.getVotedVoter() > 0
        ? Math.round(((float) electionSession.getVotedVoter() / (electionSession.getWholeVoter() - 1)) * 1000) / 10.0f : 0.0f;
    return new SessionInitialInfoDto(
        electionSession.getId(),
        electionSession.getSessionName(),
        electionSession.getHostUser().getId(),
        electionSession.getVoteStartTime(),
        electionSession.getVoteEndTime(),
        voteResults,
        wholeVoterPercent,
        electionSession.getHostUser().getId().equals(userId),
        sessionUserInfo.isHasVoted()
    );
  }

  @Override
  public SessionResponse getSessions(Long userId) {
    List<ElectionSession> ParticipatingSessions = electionRepository.findBySessionUserInfos_Id(
        userId);
    List<ElectionSession> managedSessions = electionRepository.findByHostUser_Id(userId);
    return new SessionResponse(
        ParticipatingSessions.stream().map(participatingSession -> {
          Boolean isClosed = !LocalDateTime.now().isBefore(participatingSession.getVoteEndTime());
          Boolean hasVoted = sessionUserInfoRepository.findHasvotedBySessionId_userId(participatingSession.getId(), userId);
          return SessionListDto.from(participatingSession, isClosed, hasVoted);
        }).toList(),
        managedSessions.stream().map(managedSession -> {
          Boolean hasVoted = sessionUserInfoRepository.findHasvotedBySessionId_userId(managedSession.getId(), userId);
          Boolean isClosed = !LocalDateTime.now().isBefore(managedSession.getVoteEndTime());
          return SessionListDto.from(managedSession, isClosed, hasVoted);
        }).toList()
    );
  }

  // session

  @Transactional
  @Override
  public void updateSession(Long sessionId, SessionDto sessionDto) {
    ElectionSession electionSession = electionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 세션입니다."));
    sessionDto.updateEntity(electionSession);
  }

  @Transactional
  @Override
  public boolean deleteSession(Long sessionId) {
    try {
      List<Long> voteIds = voteRepository.findIdsBySessionId(sessionId);
      voteIds.forEach(voteId -> voteCommandService.deleteVote(sessionId, voteId));
      sessionUserInfoRepository.deleteSessionUserInfoByElectionSessionId(sessionId);
      electionRepository.deleteSessionById(sessionId);
      // sui 안지웠다

    } catch (RuntimeException e) {
      return false;
    }
    return true;
  }

  @Override
  public String getQrcode(Long sessionId) {
    return electionRepository.findQrcodeById(sessionId).orElseThrow(
        () -> new IllegalArgumentException("QR 코드가 생성되지 않았습니다."));
  }

  @Override
  public SessionEditDto getSessionEdit(Long sessionId) {
    ElectionSession electionSession = electionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 세션입니다."));
    List<Vote> votes = electionRepository.findSessionEditById(sessionId);
    return new SessionEditDto(
      SessionDto.fromEntity(electionSession),
        votes.stream().map(vote ->
            VoteEditInfo.from(
                vote, electionSession.getSessionName()
            )
        ).toList()
    );
  }

  @Transactional
  @Override
  public SessionValidateResponse validateQuestion(Long sessionId, Long userId, String answer) {
    boolean isCorrect = false;
    boolean isFull = false;

    ElectionSession electionSession = electionRepository.findById(sessionId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 세션입니다."));
    int currentElectionPeopleCount = sessionUserInfoRepository.findCountByElectionSessionId(sessionId);
    int wholeVoter = electionSession.getWholeVoter();

    // 방이 꽉 찼는지 확인, 꽉 차면 그대로 리턴
    if (wholeVoter == currentElectionPeopleCount) {
      isFull = true;
      return new SessionValidateResponse(isCorrect, isFull);
    }

    // 방이 꽉 안찼는데 사용자가 올바른 답을 입력했으면 세션에 추가
    Users user = usersRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
    if (electionSession.getEntranceAnswer().equals(answer)) {
      SessionUserInfo sessionUserInfo = new SessionUserInfo();
      electionSession.addSessionUserInfo(sessionUserInfo);
      user.addSessionUserInfo(sessionUserInfo);
      isCorrect = true;
    }
    // 방이 꽉 찼는지 확인

    return new SessionValidateResponse(isCorrect, isFull);
  }

  @Override
  public USER_TYPE judgeUserType(Long sessionId, Long userId) {
    SessionUserInfo sui = sessionUserInfoRepository.findBySessionIdAndUserId(sessionId, userId).orElseThrow(() -> new IllegalArgumentException("세션에 유저가 존재하지 않습니다"));
    return sui.getUserType();
  }

  @Override
  public String getQuestion(Long sessionId) {
    return electionRepository.findEntranceQuestionById(sessionId);
  }
}
