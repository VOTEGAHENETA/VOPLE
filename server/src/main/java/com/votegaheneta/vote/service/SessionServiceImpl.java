package com.votegaheneta.vote.service;

import com.votegaheneta.common.component.VoteResultCalculator;
import com.votegaheneta.user.entity.Users;
import com.votegaheneta.user.repository.UsersRepository;
import com.votegaheneta.vote.dto.SessionDto;
import com.votegaheneta.vote.dto.SessionInitialInfoDto;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult;
import com.votegaheneta.vote.entity.ElectionSession;
import com.votegaheneta.vote.repository.SessionRepository;
import com.votegaheneta.vote.repository.VoteRepository;
import com.votegaheneta.vote.repository.VoteTeamRepository;
import java.time.LocalDateTime;
import java.util.List;
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

  private final String[] VOTE_STATUSES = {"isBefore", "isProgress", "isAfter"};

  @Override
  public Long saveSession(SessionDto sessionDto) {
    Users user = usersRepository.findById(sessionDto.getHostId())
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
    ElectionSession electionSession = sessionDto.toEntity(user);
    electionSession = sessionRepository.save(electionSession);
    return electionSession.getId();
  }

  @Override
  public SessionInitialInfoDto getSession(Long sessionId) {
    ElectionSession electionSession = sessionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("해당되는 세션 정보가 없습니다."));
    List<VoteResult> voteResults = voteResultCalculator.calculateVoteResult(sessionId);
    float wholeVoterPercent = electionSession.getVotedVoter() > 0
        ? ((float) electionSession.getVotedVoter() / electionSession.getWholeVoter()) * 100 : 0.0f;
    String voteStatus = "";
    LocalDateTime now = LocalDateTime.now();
    LocalDateTime voteStartTime = electionSession.getVoteStartTime();
    LocalDateTime voteEndTime = electionSession.getVoteEndTime();
    if (now.isBefore(voteStartTime)) {

      voteStatus = VOTE_STATUSES[0];
    } else if (now.isEqual(voteStartTime)) {
      voteStatus = VOTE_STATUSES[1];
    } else if (now.isAfter(voteStartTime) && now.isBefore(voteEndTime)) {
      voteStatus = VOTE_STATUSES[1];
    } else if (now.isAfter(voteEndTime)) {
      voteStatus = VOTE_STATUSES[2];
    }
    return new SessionInitialInfoDto(
        electionSession.getId(),
        electionSession.getSessionName(),
        voteStatus,
        voteResults,
        wholeVoterPercent
    );
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
}
