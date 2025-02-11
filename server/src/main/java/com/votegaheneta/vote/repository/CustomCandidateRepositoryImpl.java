package com.votegaheneta.vote.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.votegaheneta.user.entity.QUsers;
import com.votegaheneta.vote.entity.QCandidate;
import com.votegaheneta.vote.entity.QElectionSession;
import com.votegaheneta.vote.entity.QVote;
import com.votegaheneta.vote.entity.QVoteTeam;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

@Repository
public class CustomCandidateRepositoryImpl implements CustomCandidateRepository {
  private QUsers users = QUsers.users;
  private QCandidate candidate = QCandidate.candidate;
  private QElectionSession electionSession = QElectionSession.electionSession;
  private QVote vote = QVote.vote;
  private QVoteTeam voteTeam = QVoteTeam.voteTeam;
  private JPAQueryFactory queryFactory;

  public CustomCandidateRepositoryImpl(EntityManager em) {
    this.queryFactory = new JPAQueryFactory(em);
  }

  public Void findSearchCandidatesBySessionId(Long sessionId, Long voteId, String regex) {
    return null;
  }

}
