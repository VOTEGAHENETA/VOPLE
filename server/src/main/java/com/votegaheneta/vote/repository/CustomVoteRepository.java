package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.dto.VoteDetailDto;
import org.springframework.data.domain.Pageable;

public interface CustomVoteRepository {
  VoteDetailDto getVoteDetails(Long sessionId, Long voteId, Pageable pageable);
}
