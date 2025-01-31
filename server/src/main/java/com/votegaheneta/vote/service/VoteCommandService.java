package com.votegaheneta.vote.service;

import com.votegaheneta.vote.controller.request.VoteCastRequest;
import com.votegaheneta.vote.entity.VoteInfo;
import com.votegaheneta.vote.entity.VoteTeam;
import com.votegaheneta.vote.repository.VoteInfoRepository;
import com.votegaheneta.vote.repository.VoteTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class VoteCommandService {

  private final VoteInfoRepository voteInfoRepository;
  private final VoteTeamRepository voteTeamRepository;

  // 1. 이사람이 투표했는지
  // 2. u -> t에게 투표 + vote_info update

  @Transactional
  public void castVote(VoteCastRequest voteCastRequest) {
    Long userId = voteCastRequest.getUserId();
    for (VoteCastRequest.VoteSelection voteSelection : voteCastRequest.getVoteSelections()) {
          Long voteId = voteSelection.getVoteId();
          Long voteTeamId = voteSelection.getVoteTeamId();
      if (voteInfoRepository.existsVoteInfoByUserId(voteId, userId)) {
        // AlreadyVotedException 클래스로 재구현 해야할듯
        // ERROR_CODE = 400 | 잘못된 요청
        throw new IllegalArgumentException("이미 투표를 진행했습니다.");
      }
      VoteInfo voteInfo = voteInfoRepository.findVoteInfoByVoteIdAndUserId(voteId, userId)
          // VoteUserNotFoundException 클래스 구현 필요
          // ERROR_CODE = 404 | 투표 리소스를 찾을 수 없음
          .orElseThrow(() -> new IllegalArgumentException("투표회원의 정보를 찾을 수 없습니다."));
      // 임시로 "동영으로 진행 -> 나중에 voteTeamId 변경해서 넣어야할듯"
      final Boolean TRUE = true;
      voteInfo.updateVoteInfo(TRUE, "동영"/*voteTeamId*/);
      VoteTeam voteTeam = voteTeamRepository.findById(voteTeamId)
          .orElseThrow(() -> new IllegalArgumentException("해당 투표팀을 찾을 수 없습니다."));
      voteTeam.incrementPollCnt();
      System.out.println(voteTeam.getVote().getElectionSession().getSessionName());
      voteTeam.getVote().getElectionSession().incrementVotedVoter();
    }
  }
}
