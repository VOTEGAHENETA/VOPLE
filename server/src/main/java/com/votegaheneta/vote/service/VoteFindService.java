package com.votegaheneta.vote.service;

import com.votegaheneta.vote.dto.SessionFinalResultFindDto;
import com.votegaheneta.vote.dto.SessionFinalResultFindDto.Elected;
import com.votegaheneta.vote.dto.SessionFinalResultFindDto.ElectionSessionDto;
import com.votegaheneta.vote.dto.SessionFindDto;
import com.votegaheneta.vote.dto.SessionResultFindDto;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult.CandidateResult;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult.TeamResult;
import com.votegaheneta.vote.entity.ElectionSession;
import com.votegaheneta.vote.entity.Vote;
import com.votegaheneta.vote.entity.VoteTeam;
import com.votegaheneta.vote.repository.SessionRepository;
import com.votegaheneta.vote.repository.VoteInfoRepository;
import com.votegaheneta.vote.repository.VoteRepository;
import com.votegaheneta.vote.repository.VoteTeamRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 조회 관련 투표 서비스 클래스
 */
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VoteFindService {

  private final VoteRepository voteRepository;
  private final VoteTeamRepository voteTeamRepository;
  private final VoteInfoRepository voteInfoRepository;
  private final SessionRepository sessionRepository;
  private final String[] VOTE_STATUSES = {"isBefore", "isProgress", "isAfter"};

  public Boolean hasVoted(Long sessionId, Long userId) {
    ElectionSession session = sessionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("세션 정보를 찾을 수 없습니다."));
    return session.getVotes().stream().anyMatch(
        vote -> voteInfoRepository.existsVoteInfoByUserId(vote.getId(), userId));

//    String voteStatus = "";
//    LocalDateTime now = LocalDateTime.now();
//    LocalDateTime voteStartTime = electionSession.getVoteStartTime();
//    LocalDateTime voteEndTime = electionSession.getVoteEndTime();
//    if (now.isBefore(voteStartTime)) {
//      voteStatus = VOTE_STATUSES[0];
//    } else if (now.isEqual(voteStartTime)) {
//      voteStatus = VOTE_STATUSES[1];
//    } else if (now.isAfter(voteStartTime) && now.isBefore(voteEndTime)) {
//      voteStatus = VOTE_STATUSES[1];
//    } else if (now.isAfter(voteEndTime)) {
//      voteStatus = VOTE_STATUSES[2];
//    }
//    return voteStatus;
  }


  public SessionFindDto findVoteBySessionId(Long sessionId) {
    ElectionSession session = sessionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("세션 정보를 찾을 수 없습니다."));

    List<Vote> votes = voteRepository.findVoteBySessionId(sessionId);
    List<VoteTeam> voteTeams = voteTeamRepository.findByVote_IdIn(
        votes.stream().map(Vote::getId).toList());
    return new SessionFindDto(
        session.getId(),
        session.getSessionName(),
        votes.stream().map(vote -> {
          List<VoteTeam> matchTeams = voteTeams.stream()
              .filter(vt -> vt.getVote().getId().equals(vote.getId()))
              .toList();
          return SessionFindDto.VoteFindDto.from(vote, matchTeams);
        }).toList()
    );
  }

  public SessionResultFindDto findVoteResultBySessionId(Long sessionId) {
    ElectionSession session = sessionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("세션정보가 없습니다."));
    float wholeVoterPercent = session.getVotedVoter() > 0
        ? ((float) session.getVotedVoter() / session.getWholeVoter()) * 100 : 0.0f;
    List<VoteResult> voteResults = calculateVoteResult(sessionId);
    return new SessionResultFindDto(
        session.getSessionName(),
        wholeVoterPercent,
        voteResults
    );
  }

  public SessionFinalResultFindDto findVoteFinalResultBySessionId(Long sessionId) {
    ElectionSession session = sessionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("세션정보가 없습니다."));
    float wholeVoterPercent = session.getVotedVoter() > 0
        ? ((float) session.getVotedVoter() / session.getWholeVoter()) * 100 : 0.0f;
    List<VoteResult> voteResults = calculateVoteResult(sessionId);
    List<Elected> electedList = new ArrayList<>();

    for (VoteResult voteResult : voteResults) {
      List<TeamResult> maxTeamResultList = new ArrayList<>();
      int max = -1;
      for (TeamResult teamResult : voteResult.getTeamResults()) {
        if (teamResult.getPollCnt() == max) {
          maxTeamResultList.add(teamResult);
        } else if (teamResult.getPollCnt() > max) {
          max = teamResult.getPollCnt();
          maxTeamResultList.clear();
          maxTeamResultList.add(teamResult);
        }
      }
      electedList.addAll(maxTeamResultList.stream().map(
          teamResult -> {
            return new Elected(
                voteResult.getVoteId(),
                voteResult.getVoteName(),
                teamResult.getTeamId(),
                teamResult.getPoster(),
                teamResult.getVoteCandidateDtos()
            );
          }).toList());
    }

    return new SessionFinalResultFindDto(
        ElectionSessionDto.from(session),
        wholeVoterPercent,
        voteResults,
        electedList
    );
  }

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
            voteTeam.getPoster(),
            Math.round(teamVotePercent * 10) / 10f,
            voteTeam.getPollCnt(),
            voteTeam.getCandidates().stream().map(CandidateResult::from).toList()
        );
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
