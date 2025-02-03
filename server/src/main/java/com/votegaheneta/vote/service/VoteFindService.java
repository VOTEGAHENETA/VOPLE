package com.votegaheneta.vote.service;

import com.votegaheneta.vote.dto.SessionFindDto;
import com.votegaheneta.vote.dto.SessionFindDto.VoteFindDto;
import com.votegaheneta.vote.dto.SessionResultFindDto;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult.CandidateResult;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult.TeamResult;
import com.votegaheneta.vote.entity.ElectionSession;
import com.votegaheneta.vote.entity.Vote;
import com.votegaheneta.vote.entity.VoteTeam;
import com.votegaheneta.vote.repository.ElectionSessionRepository;
import com.votegaheneta.vote.repository.VoteRepository;
import com.votegaheneta.vote.repository.VoteTeamRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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
  private final String[] VOTE_STATUSES = {"isBefore", "isProgress", "isAfter"};

  public SessionFindDto findVoteBySessionId(Long sessionId) {
    ElectionSession electionSession = electionSessionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("세션 정보를 찾을 수 없습니다."));

    List<Vote> votes = voteRepository.findVoteBySessionId(sessionId);
    List<Long> voteIds = votes.stream().map(Vote::getId).toList();
    List<VoteTeam> voteTeams = voteTeamRepository.findByVote_IdIn(voteIds);
    String voteStatus = "";

    LocalDateTime now = LocalDateTime.now();
    LocalDateTime voteStartTime = electionSession.getVoteStartTime();
    LocalDateTime voteEndTime = electionSession.getVoteEndTime();
    if(now.isBefore(voteStartTime)) {
      voteStatus = VOTE_STATUSES[0];
    } else if(now.isEqual(voteStartTime)) {
      voteStatus = VOTE_STATUSES[1];
    } else if(now.isAfter(voteStartTime) && now.isBefore(voteEndTime)) {
      voteStatus = VOTE_STATUSES[1];
    } else if(now.isAfter(voteEndTime)) {
      voteStatus = VOTE_STATUSES[2];
    }
    List<VoteFindDto> voteFindDtos = votes.stream().map(vote -> {
      List<VoteTeam> matchTeams = voteTeams.stream()
          .filter(vt -> vt.getVote().getId().equals(vote.getId()))
          .toList();
      return SessionFindDto.VoteFindDto.from(vote, matchTeams);
    }).toList();

    return new SessionFindDto(
        electionSession.getId(),
        electionSession.getSessionName(),
        voteStatus,
        voteFindDtos
    );
  }

  public SessionResultFindDto findVoteResultBySessionId(Long sessionId) {
    ElectionSession electionSession = electionSessionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("세션정보가 없습니다."));
    float wholeVoterPercent = electionSession.getVotedVoter() > 0
        ? ((float) electionSession.getVotedVoter() / electionSession.getWholeVoter()) * 100 : 0.0f;
    List<VoteResult> voteResults = calculateVoteResult(sessionId);
    return new SessionResultFindDto(
        sessionId,
        electionSession.getSessionName(),
        wholeVoterPercent,
        voteResults
    );
  }

  /**
   * 투표 결과 집계 로직
   * JPA 성능이슈가 있어서 로직 조금 수정 필요
   * @param sessionId
   * @return
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
          if(teamResult.getTeamVotePercent() > maxTeamVotePercent) {
            maxTeamVotePercent = teamResult.getTeamVotePercent();
            maxTeamResult = teamResult;
          }
        }
        // 최종 조정치 계산
        if(maxTeamResult != null) {
          float adjustment = 100f - totalPercent;
          maxTeamResult.adjustVoteTeamPercent(adjustment);
        }
      }

      VoteResult voteResultFindDto = new VoteResult(
          vote.getId(),
          vote.getVoteName(),
          teamResults
      );
      voteResults.add(voteResultFindDto);
    }
    return voteResults;
  }
}
