package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.dto.VoteDetailDto;
import com.votegaheneta.vote.dto.VoteResultProjection;
import com.votegaheneta.vote.entity.VoteInfo;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface CustomVoteRepository {
  VoteDetailDto getVoteDetails(Long sessionId, Long voteId, Pageable pageable);
  long batchInsertVoteInfoList(List<VoteInfo> voteInfo);
  List<VoteResultProjection> findVoteResultBySessionId(Long sessionId);
}
