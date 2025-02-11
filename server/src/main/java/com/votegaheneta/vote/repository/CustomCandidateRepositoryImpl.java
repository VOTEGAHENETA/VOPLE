package com.votegaheneta.vote.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.votegaheneta.user.entity.QUsers;
import com.votegaheneta.user.enums.USER_TYPE;
import com.votegaheneta.vote.dto.VoteInfoDto;
import com.votegaheneta.vote.entity.QCandidate;
import com.votegaheneta.vote.entity.QElectionSession;
import com.votegaheneta.vote.entity.QVote;
import com.votegaheneta.vote.entity.QVoteInfo;
import com.votegaheneta.vote.entity.QVoteTeam;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public class CustomCandidateRepositoryImpl implements CustomCandidateRepository {

  private QUsers users = QUsers.users;
  private QVoteInfo voteInfo = QVoteInfo.voteInfo;
  private QCandidate candidate = QCandidate.candidate;
  private QElectionSession electionSession = QElectionSession.electionSession;
  private QVote vote = QVote.vote;
  private QVoteTeam voteTeam = QVoteTeam.voteTeam;
  private JPAQueryFactory queryFactory;

  public CustomCandidateRepositoryImpl(EntityManager em) {
    this.queryFactory = new JPAQueryFactory(em);
  }

  // 로컬 환경에서는 h2 이슈로 정규표현식 못써서 java로 처리
  @Override
  public List<VoteInfoDto> findSearchCandidatesBySessionId(Long voteId,
      String regex, Pageable pageable) {
    List<VoteInfoDto> allResults = queryFactory.select(Projections.constructor(VoteInfoDto.class,
            users.id, users.username))
        .from(voteInfo)
        .join(users).on(users.id.eq(voteInfo.user.id))
        .where(voteInfo.userType.eq(USER_TYPE.VOTER), (voteInfo.vote.id.eq(voteId)))
        .offset(pageable.getOffset())
        .limit(pageable.getPageSize())
        .fetch();
    Pattern pattern = Pattern.compile(regex);
    return allResults.stream()
        .filter(dto -> pattern.matcher(dto.getUserName()).find())
        .collect(Collectors.toList());
  }
}
