package com.votegaheneta.vote.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.votegaheneta.user.entity.QUsers;
import com.votegaheneta.vote.dto.VoteInfoDto;
import com.votegaheneta.vote.entity.QCandidate;
import com.votegaheneta.vote.entity.QElectionSession;
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
  private final QVoteTeam voteTeam = QVoteTeam.voteTeam;
  private final JPAQueryFactory queryFactory;

  public CustomCandidateRepositoryImpl(EntityManager em) {
    this.queryFactory = new JPAQueryFactory(em);
  }

  // 로컬 환경에서는 h2 이슈로 정규표현식 못써서 java로 처리
  @Override
  public List<VoteInfoDto> findSearchCandidatesBySessionId(Long voteId,
      String regex, Pageable pageable) {
    List<VoteInfoDto> allResults = queryFactory.select(Projections.constructor(VoteInfoDto.class,
            users.id, users.username, users.nickname))
        .from(voteInfo)
        .join(users).on(users.id.eq(voteInfo.user.id))
        .where((voteInfo.vote.id.eq(voteId)))
        .fetch();
    Pattern pattern = Pattern.compile(regex);
    return allResults.stream()
        .filter(dto -> pattern.matcher(dto.getUserName()).find())
        .skip(pageable.getOffset())
        .limit(pageable.getPageSize())
        .toList();
  }
}
