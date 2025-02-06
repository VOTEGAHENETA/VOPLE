package com.votegaheneta.vote.service;

import com.votegaheneta.common.component.VoteResultCalculator;
import com.votegaheneta.vote.dto.SessionFinalResultFindDto;
import com.votegaheneta.vote.dto.SessionFinalResultFindDto.Elected;
import com.votegaheneta.vote.dto.SessionFinalResultFindDto.ElectionSessionDto;
import com.votegaheneta.vote.dto.SessionFindDto;
import com.votegaheneta.vote.dto.SessionFindDto.VoteFindDto;
import com.votegaheneta.vote.dto.SessionResultFindDto;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult;
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
public class VoteFindServiceImpl implements VoteFindService{

  private final VoteRepository voteRepository;
  private final VoteTeamRepository voteTeamRepository;
  private final VoteInfoRepository voteInfoRepository;
  private final SessionRepository sessionRepository;
  private final VoteResultCalculator voteResultCalculator;

  @Override
  public Boolean hasVoted(Long sessionId, Long userId) {
    ElectionSession session = sessionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("세션 정보를 찾을 수 없습니다."));
    return session.getVotes().stream().anyMatch(
        vote -> voteInfoRepository.existsVoteInfoByUserId(vote.getId(), userId));
  }

  @Override
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

  @Override
  public SessionResultFindDto findVoteResultBySessionId(Long sessionId) {
    ElectionSession session = sessionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("세션정보가 없습니다."));
    float wholeVoterPercent = session.getVotedVoter() > 0
        ? ((float) session.getVotedVoter() / session.getWholeVoter()) * 100 : 0.0f;
    List<VoteResult> voteResults = voteResultCalculator.calculateVoteResult(sessionId);
    return new SessionResultFindDto(
        session.getSessionName(),
        wholeVoterPercent,
        voteResults
    );
  }

  @Override
  public SessionFinalResultFindDto findVoteFinalResultBySessionId(Long sessionId) {
    ElectionSession session = sessionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("세션정보가 없습니다."));
    float wholeVoterPercent = session.getVotedVoter() > 0
        ? ((float) session.getVotedVoter() / session.getWholeVoter()) * 100 : 0.0f;
    System.out.println("=".repeat(50));
    List<VoteResult> voteResults = voteResultCalculator.calculateVoteResult(sessionId);
    System.out.println("=".repeat(50));

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
                teamResult.getPrefix(),
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

  @Override
  public List<VoteFindDto> getVoteList(Long sessionId) {
    return null;
  }
}
