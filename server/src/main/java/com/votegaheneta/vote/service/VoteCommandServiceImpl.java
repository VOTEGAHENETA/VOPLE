package com.votegaheneta.vote.service;

import com.votegaheneta.vote.controller.request.VoteCastRequest;
import com.votegaheneta.vote.entity.ElectionSession;
import com.votegaheneta.vote.entity.Vote;
import com.votegaheneta.vote.entity.VoteInfo;
import com.votegaheneta.vote.entity.VoteTeam;
import com.votegaheneta.vote.exception.AlreadyVotedException;
import com.votegaheneta.vote.repository.SessionRepository;
import com.votegaheneta.vote.repository.VoteInfoRepository;
import com.votegaheneta.vote.repository.VoteRepository;
import com.votegaheneta.vote.repository.VoteTeamRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class VoteCommandServiceImpl implements VoteCommandService {

  private final VoteInfoRepository voteInfoRepository;
  private final VoteTeamRepository voteTeamRepository;
  private final SessionRepository sessionRepository;
  private final VoteRepository voteRepository;

  @Override
  @Transactional
  public void createVote(Long sessionId, String voteName) {
    ElectionSession electionSession = sessionRepository.findSessionById(sessionId);
    electionSession.addVote(new Vote(voteName));
  }

  @Override
  @Transactional
  public void deleteVote(Long voteId) {
    voteRepository.deleteById(voteId);
  }

  @Transactional
  public void castVote(VoteCastRequest voteCastRequest, Long sessionId) {
    Long userId = voteCastRequest.getUserId();
    ElectionSession electionSession = sessionRepository.findById(sessionId)
        .orElseThrow(() ->  new IllegalArgumentException("세션 정보를 찾을 수 없습니다."));
    LocalDateTime now = LocalDateTime.now();
    LocalDateTime voteStartTime = electionSession.getVoteStartTime();
    LocalDateTime voteEndTime = electionSession.getVoteEndTime();
//    if (now.isBefore(voteStartTime) || now.isAfter(voteEndTime)) {
//      throw  new IllegalArgumentException("지금은 투표를 진행할 수 없습니다.");
//    }
    for (VoteCastRequest.VoteSelection voteSelection : voteCastRequest.getVoteSelections()) {
      Long voteId = voteSelection.getVoteId();
      Long voteTeamId = voteSelection.getVoteTeamId();
      if (voteInfoRepository.existsVoteInfoByUserId(voteId, userId)) {
        throw new AlreadyVotedException("이미 투표를 진행했습니다.");
      }
      VoteInfo voteInfo = voteInfoRepository.findVoteInfoByVoteIdAndUserId(voteId, userId)
          .orElseThrow(() -> new IllegalArgumentException("투표회원의 정보를 찾을 수 없습니다."));
      final Boolean TRUE = true;
      voteInfo.updateVoteInfo(TRUE);
      VoteTeam voteTeam = voteTeamRepository.findById(voteTeamId)
          .orElseThrow(() -> new IllegalArgumentException("해당 투표팀을 찾을 수 없습니다."));
      voteTeam.incrementPollCnt();
    }
    electionSession.incrementVotedVoter();
  }

}