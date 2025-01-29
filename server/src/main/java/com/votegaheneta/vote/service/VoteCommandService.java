package com.votegaheneta.vote.service;

import com.votegaheneta.vote.dto.request.VoteCastRequest;
import com.votegaheneta.vote.entity.VoteInfo;
import com.votegaheneta.vote.repository.VoteInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class VoteCommandService {

  private final VoteInfoRepository voteInfoRepository;
  private final Boolean TRUE = true;

  // 1. 이사람이 투표했느지
  // 2. u -> c에게 투표 + vote_info update

  @Transactional
  public void castVote(VoteCastRequest voteCastRequest) {
    Long userId = voteCastRequest.getUserId();
    Long voteId = voteCastRequest.getVoteId();
    if (voteInfoRepository.existsVoteInfoByUserId(voteId, userId)) {
      // AlreadyVotedException 클래스로 재구현 해야할듯
      throw new IllegalArgumentException("이미 투표를 진행했습니다.");
    }
    VoteInfo voteInfo = voteInfoRepository.findVoteInfoByVoteIdAndUserId(voteId, userId)
        .orElseThrow(() -> new IllegalArgumentException("투표회원의 정보를 찾을 수 없습니다."));
    voteInfo.updateVoteInfo(TRUE, "동영" /*voteCastRequest.getCandidateId()*/);
  }
}
