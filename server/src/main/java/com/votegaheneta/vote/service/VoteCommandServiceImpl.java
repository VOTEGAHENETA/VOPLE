package com.votegaheneta.vote.service;

import com.votegaheneta.vote.controller.request.VoteCastRequest;
import com.votegaheneta.vote.entity.ElectionSession;
import com.votegaheneta.vote.entity.SessionUserInfo;
import com.votegaheneta.vote.entity.Vote;
import com.votegaheneta.vote.entity.VoteTeam;
import com.votegaheneta.vote.exception.AlreadyVotedException;
import com.votegaheneta.vote.repository.CandidateRepository;
import com.votegaheneta.vote.repository.ElectionRepository;
import com.votegaheneta.vote.repository.PledgeRepository;
import com.votegaheneta.vote.repository.SessionUserInfoRepository;
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
  private final ElectionRepository electionRepository;
  private final VoteRepository voteRepository;
  private final CandidateRepository candidateRepository;
  private final PledgeRepository pledgeRepository;
  private final SessionUserInfoRepository sessionUserInfoRepository;

  @Override
  @Transactional
  public void createVote(Long sessionId, String voteName) {
    ElectionSession electionSession = electionRepository.findSessionById(sessionId);
    Vote vote = new Vote(voteName);
    electionSession.addVote(vote);
//    sessionUserInfoRepository.findSessionUserInfosByElectionSessionId(sessionId)
//        .stream().map(sessionUserInfo -> new VoteInfo(vote, sessionUserInfo.getUser()))
//        .forEach(vote::addVoteInfo);
//    ;
//    voteInfoRepository.saveAll(vote.getVoteInfos());
  }

  @Override
  @Transactional
  public void deleteVote(Long voteId) {
    candidateRepository.deleteByVoteId(voteId);
    pledgeRepository.deleteByVoteId(voteId);
    voteTeamRepository.deleteByVoteId(voteId);
    voteRepository.deleteById(voteId);
  }


  @Transactional
  public void castVote(VoteCastRequest voteCastRequest, Long sessionId, Long userId) {
     ElectionSession electionSession = electionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("세션 정보를 찾을 수 없습니다."));
    LocalDateTime now = LocalDateTime.now();
    LocalDateTime voteStartTime = electionSession.getVoteStartTime();
    LocalDateTime voteEndTime = electionSession.getVoteEndTime();
    if (now.isBefore(voteStartTime) || now.isAfter(voteEndTime)) {
      throw  new IllegalArgumentException("지금은 투표를 진행할 수 없습니다.");
    }
    final Boolean TRUE = true;
    SessionUserInfo sessionUserInfo = sessionUserInfoRepository.findBySessionIdAndUserId(sessionId, userId).orElseThrow(
        () -> new IllegalArgumentException("투표회원의 정보를 찾을 수 없습니다.")
    );
    if (sessionUserInfo.isHasVoted()) {
      throw new AlreadyVotedException("이미 투표를 진행했습니다.");
    }
    sessionUserInfo.updateSessionInfoHasVoted(TRUE);
    for (VoteCastRequest.VoteSelection voteSelection : voteCastRequest.getVoteSelections()) {
      Long voteTeamId = voteSelection.getVoteTeamId();
      VoteTeam voteTeam = voteTeamRepository.findById(voteTeamId)
          .orElseThrow(() -> new IllegalArgumentException("해당 투표팀을 찾을 수 없습니다."));
      voteTeam.incrementPollCnt();
    }
    electionSession.incrementVotedVoter();
  }
}