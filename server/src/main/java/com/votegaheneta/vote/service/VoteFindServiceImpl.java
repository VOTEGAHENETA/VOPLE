package com.votegaheneta.vote.service;

import com.votegaheneta.common.component.SearchComponent;
import com.votegaheneta.common.component.VoteResultCalculator;
import com.votegaheneta.common.repository.RedisRepository;
import com.votegaheneta.vote.dto.SessionFinalResultFindDto;
import com.votegaheneta.vote.dto.SessionFinalResultFindDto.ElectionSessionDto;
import com.votegaheneta.vote.dto.SessionFindDto;
import com.votegaheneta.vote.dto.SessionFindDto.VoteFindDto;
import com.votegaheneta.vote.dto.SessionResultFindDto;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult;
import com.votegaheneta.vote.dto.VoteDetailDto;
import com.votegaheneta.vote.dto.VoteInfoDto;
import com.votegaheneta.vote.entity.ElectionSession;
import com.votegaheneta.vote.entity.Vote;
import com.votegaheneta.vote.entity.VoteTeam;
import com.votegaheneta.vote.repository.CustomCandidateRepository;
import com.votegaheneta.vote.repository.SessionRepository;
import com.votegaheneta.vote.repository.VoteInfoRepository;
import com.votegaheneta.vote.repository.VoteRepository;
import com.votegaheneta.vote.repository.VoteTeamRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 조회 관련 투표 서비스 클래스
 */
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VoteFindServiceImpl implements VoteFindService {

  private final VoteRepository voteRepository;
  private final VoteTeamRepository voteTeamRepository;
  private final VoteInfoRepository voteInfoRepository;
  private final SessionRepository sessionRepository;
  private final VoteResultCalculator voteResultCalculator;
  private final RedisRepository redisRepository;
  private final SearchComponent searchComponent;
  private final CustomCandidateRepository customCandidateRepository;

  @Override
  public VoteDetailDto getVoteDetail(Long sessionId, Long voteId, Pageable pageable) {
    return voteRepository.getVoteDetails(sessionId, voteId, pageable);
  }

  @Override
  public Boolean hasVoted(Long sessionId, Long userId) {
    ElectionSession electionSession = sessionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("세션 정보를 찾을 수 없습니다."));
    Boolean hasVoted = electionSession.getVotes().stream().anyMatch(
        vote -> (voteInfoRepository.existsVoteInfoByUserId(vote.getId(), userId)).equals("TRUE")) ;
    return hasVoted;
  }

  @Override
  public List<VoteFindDto> getVoteList(Long sessionId) {
    List<Vote> votes = voteRepository.findVoteBySessionId(sessionId);
    return votes.stream().map(VoteFindDto::from).toList();
  }

  @Transactional(readOnly = true)
  @Override
  public List<VoteInfoDto> findSearchCandidates(Long voteId, String keyword, Pageable pageable) {
    StringBuilder sb = new StringBuilder();
    keyword = keyword.trim();
    for (String word : keyword.split("")) {
      sb.append(searchComponent.searchWordReSetting(word));
    }
    List<VoteInfoDto> voteInfoDtos = customCandidateRepository.findSearchCandidatesBySessionId(voteId, sb.toString(), pageable);
    return voteInfoDtos;
  }

  @Override
  public SessionFindDto findVoteBySessionId(Long sessionId) {
    ElectionSession electionSession = sessionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("세션 정보를 찾을 수 없습니다."));
    List<Vote> votes = voteRepository.findVoteBySessionId(sessionId);
    List<Long> voteIds = votes.stream().map(Vote::getId).toList();
    List<VoteTeam> voteTeams = voteTeamRepository.findByVote_IdIn(voteIds);
    List<VoteFindDto> voteFindDtos = votes.stream().map(vote -> {
      List<VoteTeam> matchTeams = voteTeams.stream()
          .filter(vt -> vt.getVote().getId().equals(vote.getId()))
          .toList();
      return VoteFindDto.from(vote, matchTeams);
    }).toList();
    return new SessionFindDto(
        electionSession.getId(),
        electionSession.getSessionName(),
        voteFindDtos
    );
  }

  @Transactional(readOnly = true)
  @Override
  public SessionResultFindDto findVoteResultBySessionId(Long sessionId) {
    ElectionSession electionSession = sessionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("세션정보가 없습니다."));
    float wholeVoterPercent = electionSession.getVotedVoter() > 0
        ? ((float) electionSession.getVotedVoter() / electionSession.getWholeVoter()) * 100 : 0.0f;
    List<VoteResult> voteResults = voteResultCalculator.calculateVoteResult(sessionId);
    return new SessionResultFindDto(
        electionSession.getSessionName(),
        wholeVoterPercent,
        voteResults
    );
  }

  @Transactional
  @Override
  public SessionFinalResultFindDto findVoteFinalResultBySessionId(Long sessionId) {
//    String sessionRedisKey = "session:vote:result:"+sessionId;
    List<VoteResult> voteResults = new ArrayList<>();
//    List<VoteResult> redisVoteResults = redisRepository.getVoteResults(sessionRedisKey);
    ElectionSession electionSession = sessionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("세션정보가 없습니다."));
//    if(redisVoteResults.isEmpty()) {
//      voteResults = voteResultCalculator.calculateVoteResult(sessionId);
//      redisRepository.saveVoteResults(sessionRedisKey, voteResults);
//    }else {
//      voteResults = redisVoteResults;
//    }
    voteResults = voteResultCalculator.calculateVoteResult(sessionId);
    float wholeVoterPercent = electionSession.getVotedVoter() > 0
        ? ((float) electionSession.getVotedVoter() / electionSession.getWholeVoter()) * 100 : 0.0f;
    return new SessionFinalResultFindDto(
        ElectionSessionDto.from(electionSession),
        wholeVoterPercent,
        voteResults,
        voteResultCalculator.electionListResult(voteResults)
    );
  }
}
