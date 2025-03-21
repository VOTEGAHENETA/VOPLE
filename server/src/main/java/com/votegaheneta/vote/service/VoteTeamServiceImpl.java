package com.votegaheneta.vote.service;

import com.votegaheneta.chat.service.ChatService;
import com.votegaheneta.common.component.FileStorageComponent;
import com.votegaheneta.common.component.JdbcBatchComponent;
import com.votegaheneta.stream.entity.Stream;
import com.votegaheneta.stream.repository.StreamRepository;
import com.votegaheneta.user.dto.UserDto;
import com.votegaheneta.user.entity.Users;
import com.votegaheneta.user.repository.UsersRepository;
import com.votegaheneta.vote.controller.request.CandidateRequestDto;
import com.votegaheneta.vote.controller.request.VoteTeamInfoRequest;
import com.votegaheneta.vote.controller.response.VoteTeamInfoResponse;
import com.votegaheneta.vote.dto.PledgeDto;
import com.votegaheneta.vote.dto.VoteTeamDto;
import com.votegaheneta.vote.dto.VoteTeamPledgeDto;
import com.votegaheneta.vote.entity.Candidate;
import com.votegaheneta.vote.entity.Vote;
import com.votegaheneta.vote.entity.VoteTeam;
import com.votegaheneta.vote.repository.CandidateRepository;
import com.votegaheneta.vote.repository.PledgeRepository;
import com.votegaheneta.vote.repository.SessionUserInfoRepository;
import com.votegaheneta.vote.repository.VoteRepository;
import com.votegaheneta.vote.repository.VoteTeamRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class VoteTeamServiceImpl implements VoteTeamService {

  private final VoteTeamRepository voteTeamRepository;
  private final VoteRepository voteRepository;
  private final UsersRepository usersRepository;
  private final SessionUserInfoRepository sessionUserInfoRepository;
  private final CandidateRepository candidateRepository;
  private final PledgeRepository pledgeRepository;
  private final ChatService chatService;
  private final StreamRepository streamRepository;
  private final FileStorageComponent fileStorageComponent;
  private final JdbcBatchComponent jdbcBatchComponent;

  @Value("${spring.data.hls.host-prefix}")
  private String STREAMING_PREFIX;

  @Value("${spring.data.hls.host-postfix}")
  private String STREAMING_POSTFIX;

  private final static String POSTER_TYPE = "poster";

  @Transactional
  @Override
  public void modifyVoteTeam(Long sessionId, Long voteId, CandidateRequestDto candidateRequest) {
    deleteAllVoteTeam(voteId);
    List<VoteTeam> voteTeam = createVoteTeam(voteId, candidateRequest);
    createStream(voteId, voteTeam);
    updateUserTypeInSessionUserInfo(sessionId, candidateRequest);
  }

  private void updateUserTypeInSessionUserInfo(Long sessionId,
      CandidateRequestDto candidateRequest) {
    List<List<UserDto>> voteTeamList = candidateRequest.getVoteTeamList();
    List<UserDto> userDtoList = voteTeamList.stream().flatMap(List::stream).toList();
    List<Users> userList = userDtoList.stream().map(UserDto::toEntity).toList();
    int updateCnt = sessionUserInfoRepository.updateUserTypeInSessionUserInfo(sessionId, userList);
  }

  @Transactional
  public void deleteAllVoteTeam(Long voteId) {
    Vote vote = voteRepository.findVoteWithVoteTeamById(voteId).orElseThrow(() -> new IllegalArgumentException("투표가 존재하지 않습니다."));
    streamRepository.deleteAllStreamByVoteTeam(vote.getVoteTeams());
    candidateRepository.deleteAllCandidateByVoteTeam(vote.getVoteTeams());
    pledgeRepository.deleteAllPledgeByVoteTeam(vote.getVoteTeams());
    voteTeamRepository.deleteVoteTeamByVoteId(voteId);
  }

  private List<VoteTeam> createVoteTeam(Long voteId, CandidateRequestDto request) {
    Vote vote = voteRepository.findById(voteId)
        .orElseThrow(() -> new IllegalArgumentException("투표가 존재하지 않습니다."));
    List<VoteTeam> voteTeams = new ArrayList<>();
    List<List<UserDto>> voteTeamList = request.getVoteTeamList();
    for (List<UserDto> userDtos : voteTeamList) {
      VoteTeam voteTeam = new VoteTeam();
      vote.addVoteTeam(voteTeam);
      voteTeams.add(voteTeam);
    }
    voteTeamRepository.saveAll(voteTeams);
    voteTeamRepository.flush();
    for (int i = 0; i < voteTeams.size(); i++) {
      jdbcBatchComponent.candidateBatchInsert(voteTeams.get(i).getId()
          , voteTeamList.get(i).stream().map(UserDto::getUserId).toList());
    }
    return voteTeams;
  }

  private void createStream(Long voteTeamId, List<VoteTeam> voteTeams) {
    voteTeams.forEach(voteTeam -> voteTeam.setStream(
        new Stream(STREAMING_PREFIX + voteTeam.getId() + STREAMING_POSTFIX)));
    voteTeamRepository.saveAll(voteTeams);
  }

  @Transactional
  @Override
  public void updateVoteTeamInfo(VoteTeamInfoRequest request, MultipartFile file) {
    VoteTeam voteTeam = voteTeamRepository.findById(request.getVoteTeam().getVoteTeamId())
        .orElseThrow(() -> new IllegalArgumentException("후보를 찾을 수 없습니다."));
    if (file != null && !file.isEmpty()) {
      String fileName = fileStorageComponent.fileSave(file, POSTER_TYPE);
      request.getVoteTeam().setPoster(fileName);
    } else {
      request.getVoteTeam().setPoster(voteTeam.getPoster());
    }
    // 후보자 칭호, 상태 메세지, 포스터 바꿈
    request.getVoteTeam().updateVoteTeamInfo(voteTeam);
    // 이미 존재하는 공약들 다 지우고 새롭게 다시 넣음
    pledgeRepository.deleteAllByVoteTeamId(voteTeam.getId());
    jdbcBatchComponent.pledgeBatchInsert(voteTeam.getId(), List.of(request.getPledges()));
  }

  private Candidate getCandidate(Long sessionId, Long userId) {
    List<Candidate> candidateList = candidateRepository.findCandidateAndUserAndVoteTeamByUserId(
        userId);
    // 특정 투표에 속한 후보자만 가져옴
    Candidate candidate = candidateList.stream()
        .filter(c -> Objects.equals(c.getVoteTeam().getVote().getElectionSession().getId(),
            sessionId)).toList()
        .get(0);
    return candidate;
  }

  @Transactional
  @Override
  public VoteTeamInfoResponse getVoteTeamInfo(Long sessionId, Long userId) {
    Candidate candidate = getCandidate(sessionId, userId);
    VoteTeamDto voteTeamDto = new VoteTeamDto(candidate.getVoteTeam());
    List<PledgeDto> pledgeDtoList = candidate.getVoteTeam().getPledges().stream()
        .map(PledgeDto::fromEntity).toList();
    return new VoteTeamInfoResponse(voteTeamDto, pledgeDtoList);
  }

  @Transactional
  @Override
  public VoteTeamPledgeDto getVoteTeamInfoDetail(Long teamId) {
    VoteTeam voteTeam = voteTeamRepository.findById(teamId)
        .orElseThrow(() -> new IllegalArgumentException("투표 팀정보를 찾을 수 없습니다."));
    List<PledgeDto> pledgeDtoList = voteTeam.getPledges().stream().map(PledgeDto::fromEntity).toList();
    return new VoteTeamPledgeDto(voteTeam.getPoster(), pledgeDtoList);
  }
}
