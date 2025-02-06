package com.votegaheneta.common.component;

import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult.CandidateResult;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult.TeamResult;
import com.votegaheneta.vote.entity.Vote;
import com.votegaheneta.vote.entity.VoteTeam;
import com.votegaheneta.vote.repository.VoteRepository;
import com.votegaheneta.vote.repository.VoteTeamRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class VoteResultCalculator {

  private final VoteRepository voteRepository;
  private final VoteTeamRepository voteTeamRepository;

  /**
   * 투표 결과 집계 로직 JPA 성능이슈가 있어서 로직 조금 수정 필요
   *
   * @param sessionId
   * @return List<VoteResult>
   */
  public List<VoteResult> calculateVoteResult(Long sessionId) {
    // 결과값 빼려면 wholeVoterPercent, VoteResults 이거 2개를 빼야하니까
    List<VoteResult> voteResults = new ArrayList<>();
    List<Vote> votes = voteRepository.findVoteBySessionId(sessionId);
    for (Vote vote : votes) {
      List<VoteTeam> voteTeams = voteTeamRepository.findByVoteId(vote.getId());
      int totalVoteCnt = voteTeams.stream().mapToInt(VoteTeam::getPollCnt).sum();
      List<TeamResult> teamResults = voteTeams.stream().map(voteTeam -> {
        float teamVotePercent =
            totalVoteCnt > 0 ? ((float) voteTeam.getPollCnt() / totalVoteCnt) * 100 : 0.0f;
        return new TeamResult(
            voteTeam.getId(),
            voteTeam.getPrefix(),
            voteTeam.getPollCnt(),
            voteTeam.getCandidates().stream().map(CandidateResult::from).toList(),
            voteTeam.getPoster(),
            voteTeam.getCandidateStatement(),
            Math.round(teamVotePercent * 10) / 10f);
      }).toList();
      // 전체 팀의 퍼센트를 구해서 100이 넘거나 100보다 작으면 퍼센트 조정
      float totalPercent = 0.0f;
      for (TeamResult teamResult : teamResults) {
        totalPercent += teamResult.getTeamVotePercent();
      }
      TeamResult maxTeamResult = null;
      float maxTeamVotePercent = 0.0f;
      for (TeamResult teamResult : teamResults) {
        if (teamResult.getTeamVotePercent() > maxTeamVotePercent) {
          maxTeamVotePercent = teamResult.getTeamVotePercent();
          maxTeamResult = teamResult;
        }
        // 최종 조정치 계산
        if (maxTeamResult != null) {
          float adjustment = 100f - totalPercent;
          maxTeamResult.adjustVoteTeamPercent(adjustment);
        }
      }

      VoteResult voteResult = new VoteResult(
          vote.getId(),
          vote.getVoteName(),
          teamResults
      );
      voteResults.add(voteResult);
    }
    return voteResults;
  }
}
