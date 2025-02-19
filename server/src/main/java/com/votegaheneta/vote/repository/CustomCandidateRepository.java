package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.dto.VoteInfoDto;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface CustomCandidateRepository {
  List<VoteInfoDto> findSearchCandidatesBySessionId(Long sessionId, Long voteId, String regex, Pageable pageable);
}
