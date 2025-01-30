package com.votegaheneta.vote.service;

import com.votegaheneta.vote.dto.SessionResultFindDto;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult.CandidateResult;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult.TeamResult;
import com.votegaheneta.vote.dto.VoteFindDto;
import com.votegaheneta.vote.entity.ElectionSession;
import com.votegaheneta.vote.entity.Vote;
import com.votegaheneta.vote.entity.VoteTeam;
import com.votegaheneta.vote.repository.ElectionSessionRepository;
import com.votegaheneta.vote.repository.VoteRepository;
import com.votegaheneta.vote.repository.VoteTeamRepository;
import java.util.ArrayList;
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
  private final ElectionSessionRepository electionSessionRepository;

  public List<VoteFindDto> findVoteBySessionId(Long sessionId) {
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


  // JPA 성능이슈가 있어서 로직 조금 수정해야할듯
  public SessionResultFindDto findVoteResultBySessionId(Long sessionId) {
    List<VoteResult> voteResults = new ArrayList<>();
    ElectionSession electionSession = electionSessionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("세션정보가 없습니다."));
    List<Vote> votes = voteRepository.findVoteBySessionId(sessionId);
    float wholeVoterPercent = 0f;

    for (Vote vote : votes) {
      List<VoteTeam> voteTeams = voteTeamRepository.findByVoteId(vote.getId());

      int totalVoteCnt = voteTeams.stream().mapToInt(VoteTeam::getPollCnt).sum();
      wholeVoterPercent = totalVoteCnt > 0
          ? ((float) electionSession.getWholeVoter() / electionSession.getVotedVoter()) * 100 : 0.0f;

      List<TeamResult> teamResults = voteTeams.stream().map(voteTeam -> {
        float teamVotePercent =
            totalVoteCnt > 0 ? ((float) voteTeam.getPollCnt() / totalVoteCnt) * 100 : 0.0f;

        return new TeamResult(
            voteTeam.getId(),
            Math.round(teamVotePercent * 10) / 10f,
            voteTeam.getCandidates().stream().map(CandidateResult::from).toList()
        );
      }).toList();
      
      // 전체 팀의 퍼센트를 구해서 100이 넘거나 100보다 작으면 퍼센트 조정
      float totalPercent = 0.0f;
      for (TeamResult teamResult : teamResults) {
        totalPercent += teamResult.getTeamVotePercent();
      }
      if(Math.abs(totalPercent - 100f) > 0.01f) {
        TeamResult maxTeamResult = null;
        float maxTeamVotePercent = 0.0f;
        for (TeamResult teamResult : teamResults) {
          maxTeamVotePercent = Math.max(maxTeamVotePercent, teamResult.getTeamVotePercent());
          maxTeamResult = teamResult;
        }
        
        // 최종 조정치 계산
        if(maxTeamResult != null) {
          float adjustment = 100f - maxTeamVotePercent;
          maxTeamResult.adjustVoteTeamPercent(adjustment);
        }
      }
      
      VoteResult voteResultFindDto = new VoteResult(
          vote.getId(),
          vote.getVoteName(),
          totalPercent,
          teamResults
      );
      voteResults.add(voteResultFindDto);
    }
    return new SessionResultFindDto(
        sessionId,
        electionSession.getSessionName(),
        wholeVoterPercent,
        voteResults
    );
  }
}
