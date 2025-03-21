package com.votegaheneta.vote.service;

import com.votegaheneta.vote.dto.SessionFinalResultFindDto;
import com.votegaheneta.vote.dto.SessionFindDto;
import com.votegaheneta.vote.dto.SessionFindDto.VoteFindDto;
import com.votegaheneta.vote.dto.SessionResultFindDto;
import com.votegaheneta.vote.dto.VoteDetailDto;
import com.votegaheneta.vote.dto.VoteInfoDto;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface VoteFindService {

  public VoteDetailDto getVoteDetail(Long sessionId, Long voteId, Pageable pageable);

  public SessionFindDto findVoteBySessionId(Long sessionId);

  public SessionResultFindDto findVoteResultBySessionId(Long sessionId);

  public SessionFinalResultFindDto findVoteFinalResultBySessionId(Long sessionId);

  List<VoteFindDto> getVoteList(Long sessionId);

  List<VoteInfoDto> findSearchCandidates(Long sessionId, Long voteId, String keyword, Pageable pageable);
}
