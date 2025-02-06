package com.votegaheneta.vote.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.votegaheneta.common.component.VoteResultCalculator;
import com.votegaheneta.user.entity.Users;
import com.votegaheneta.user.repository.UsersRepository;
import com.votegaheneta.vote.controller.response.SessionResponse;
import com.votegaheneta.vote.dto.SessionDto;
import com.votegaheneta.vote.dto.SessionInitialInfoDto;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult;
import com.votegaheneta.vote.entity.ElectionSession;
import com.votegaheneta.vote.entity.VoteStatus;
import com.votegaheneta.vote.repository.SessionRepository;
import com.votegaheneta.vote.repository.VoteRepository;
import com.votegaheneta.vote.repository.VoteTeamRepository;
import java.awt.image.BufferedImage;
import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import javax.imageio.ImageIO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SessionServiceImpl implements SessionService {

  private final VoteTeamRepository voteTeamRepository;
  private final VoteRepository voteRepository;
  private final SessionRepository sessionRepository;
  private final UsersRepository usersRepository;
  private final VoteResultCalculator voteResultCalculator;

  private final String UPLOAD_DIR = "/app/uploads/";

  @Override
  public Long saveSession(SessionDto sessionDto) {
    Users user = usersRepository.findById(sessionDto.getHostId())
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
    ElectionSession electionSession = sessionDto.toEntity(user);
    electionSession = sessionRepository.save(electionSession);

    // qr코드로 접속할 url
    String url = "http://i12b102.p.ssafy.io/api/election/"+electionSession.getId();

    int width = 400;
    int height = 400;

    // qr코드 생성하는 코드
    try {
      BitMatrix encode = new MultiFormatWriter()
          .encode(url, BarcodeFormat.QR_CODE, width, height);

      BufferedImage qrCodeImage = MatrixToImageWriter.toBufferedImage(encode);

      String fileName = "qrcode_" + electionSession.getId() + ".png";
      File qrCodeFile = new File(UPLOAD_DIR + "qrcode/", fileName);

      qrCodeFile.getParentFile().mkdirs();
      ImageIO.write(qrCodeImage, "png", qrCodeFile);
      String relativePath = "/qrcode/" + fileName;
      electionSession.setQrCode(relativePath);
      sessionRepository.save(electionSession);
    } catch (Exception e) {
      throw new IllegalArgumentException("QR코드 생성에 실패했습니다.", e);
    }
    return electionSession.getId();
  }

  @Override
  public SessionDto getSessionById(Long sessionId) {
    ElectionSession electionSession = sessionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 세션입니다."));
    return SessionDto.fromEntity(electionSession);
  }

  @Override
  public SessionInitialInfoDto getSession(Long sessionId) {
    ElectionSession electionSession = sessionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("해당되는 세션 정보가 없습니다."));
    List<VoteResult> voteResults = voteResultCalculator.calculateVoteResult(sessionId);
    float wholeVoterPercent = electionSession.getVotedVoter() > 0
        ? ((float) electionSession.getVotedVoter() / electionSession.getWholeVoter()) * 100 : 0.0f;
    VoteStatus voteStatus = VoteStatus.IN_PROGRESS;
    LocalDateTime now = LocalDateTime.now();
    if (now.isBefore(electionSession.getVoteStartTime())) {
      voteStatus = VoteStatus.BEFORE_START;
    } else if (now.isAfter(electionSession.getVoteEndTime())) {
      voteStatus = VoteStatus.FINISHED;
    }
    return new SessionInitialInfoDto(
        electionSession.getId(),
        electionSession.getSessionName(),
        voteStatus,
        voteResults,
        wholeVoterPercent
    );
  }

  @Override
  public SessionResponse getSessions(Long userId) {
    List<ElectionSession> managedElectionSessions = sessionRepository.findByHostUser_Id(userId);
    return new SessionResponse(
        managedElectionSessions.stream().map(SessionDto::fromEntity).toList(),
        managedElectionSessions.stream().map(SessionDto::fromEntity).toList()
    );
  }
  
  public List<SessionDto> getSessionList() {
    List<ElectionSession> sessionList = sessionRepository.findAll();
    return sessionList.stream().map(SessionDto::fromEntity).toList();
  }

  @Transactional
  @Override
  public void updateSession(Long sessionId, SessionDto sessionDto) {
    ElectionSession electionSession = sessionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 세션입니다."));
    sessionDto.updateEntity(electionSession);
  }

  @Override
  public boolean deleteSession(Long sessionId) {
    try {
      sessionRepository.deleteById(sessionId);
    } catch (RuntimeException e) {
      return false;
    }
    return true;
  }

  @Override
  public String getQrcode(Long sessionId) {
    return sessionRepository.findQrcodeById(sessionId);
  }
}
