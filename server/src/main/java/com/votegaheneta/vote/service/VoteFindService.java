package com.votegaheneta.vote.service;

import com.votegaheneta.vote.dto.VoteFindDto;
import com.votegaheneta.vote.entity.Vote;
import com.votegaheneta.vote.entity.VoteTeam;
import com.votegaheneta.vote.repository.VoteRepository;
import com.votegaheneta.vote.repository.VoteTeamRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 생성, 조회, 수정, 삭제 관련 투표 서비스 클래스
 */
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VoteFindService {

  private final VoteRepository voteRepository;
  private final VoteTeamRepository voteTeamRepository;

  public List<VoteFindDto> findVoteByVoteId(Long sessionId) {
    List<Vote> votes = voteRepository.findVoteBySessionId(sessionId);

    List<Long> voteIds = votes.stream().map(Vote::getId).toList();

    List<VoteTeam> voteTeams = voteTeamRepository.findByVote_IdIn(voteIds);
    return votes.stream().map(vote -> {
      List<VoteTeam> matchTeams = voteTeams.stream()
          .filter(vt -> vt.getVote().getId().equals(vote.getId()))
          .collect(Collectors.toList());
      return VoteFindDto.from(vote, matchTeams);
    }).collect(Collectors.toList());
  }


  public void findVoteResultByVoteId(Long voteId) {

  }
}
