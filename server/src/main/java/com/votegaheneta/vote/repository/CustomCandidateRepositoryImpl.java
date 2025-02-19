package com.votegaheneta.vote.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.votegaheneta.user.entity.QUsers;
import com.votegaheneta.user.enums.USER_TYPE;
import com.votegaheneta.vote.dto.VoteInfoDto;
import com.votegaheneta.vote.entity.Candidate;
import com.votegaheneta.vote.entity.QCandidate;
import com.votegaheneta.vote.entity.QElectionSession;
import com.votegaheneta.vote.entity.QSessionUserInfo;
import com.votegaheneta.vote.entity.QVote;
import com.votegaheneta.vote.entity.QVoteInfo;
import com.votegaheneta.vote.entity.QVoteTeam;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.regex.Pattern;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public class CustomCandidateRepositoryImpl implements CustomCandidateRepository {

  private final QUsers users = QUsers.users;
  private final QVoteInfo voteInfo = QVoteInfo.voteInfo;
  private final QCandidate candidate = QCandidate.candidate;
  private final QElectionSession electionSession = QElectionSession.electionSession;
  private final QVote vote = QVote.vote;
  private final QSessionUserInfo sessionUserInfo = QSessionUserInfo.sessionUserInfo;
  private final QVoteTeam voteTeam = QVoteTeam.voteTeam;

  private CandidateRepository candidateRepository;
  private final JPAQueryFactory queryFactory;

  public CustomCandidateRepositoryImpl(EntityManager em, CandidateRepository candidateRepository) {
    this.queryFactory = new JPAQueryFactory(em);
    this.candidateRepository = candidateRepository;
  }

  @Override
  public List<VoteInfoDto> findSearchCandidatesBySessionId(Long sessionId, Long voteId,
      String regex, Pageable pageable) {
    List<VoteInfoDto> allResults = queryFactory.select(Projections.constructor(VoteInfoDto.class,
            users.id, users.username, users.nickname))
        .from(sessionUserInfo)
        .join(users).on(users.id.eq(sessionUserInfo.user.id))
        .where((sessionUserInfo.electionSession.id.eq(sessionId)).and((sessionUserInfo.userType).eq(USER_TYPE.VOTER)))
        .fetch();
    List<Candidate> candidates = candidateRepository.findCandidateAndUserAndVoteTeamByVoteId(voteId);
    System.out.println(allResults);
    allResults.addAll(candidates.stream().map(VoteInfoDto::from).toList());
    System.out.println(allResults);
    Pattern pattern = Pattern.compile(regex);
    return allResults.stream()
        .filter(dto -> pattern.matcher(dto.getUsername()).find())
        .skip(pageable.getOffset())
        .limit(pageable.getPageSize())
        .toList();
  }
}
