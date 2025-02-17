package com.votegaheneta.vote.repository;

import static com.votegaheneta.user.entity.QUsers.users;
import static com.votegaheneta.vote.entity.QCandidate.candidate;
import static com.votegaheneta.vote.entity.QElectionSession.electionSession;
import static com.votegaheneta.vote.entity.QSessionUserInfo.sessionUserInfo;
import static com.votegaheneta.vote.entity.QVote.vote;
import static com.votegaheneta.vote.entity.QVoteTeam.voteTeam;
import static java.util.stream.Collectors.groupingBy;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.votegaheneta.user.dto.UserDto;
import com.votegaheneta.user.entity.QUsers;
import com.votegaheneta.user.entity.Users;
import com.votegaheneta.vote.dto.CandidateDto;
import com.votegaheneta.vote.dto.VoteDetailDto;
import com.votegaheneta.vote.dto.VoteResultProjection;
import com.votegaheneta.vote.entity.Candidate;
import com.votegaheneta.vote.entity.QCandidate;
import com.votegaheneta.vote.entity.QElectionSession;
import com.votegaheneta.vote.entity.QSessionUserInfo;
import com.votegaheneta.vote.entity.QVote;
import com.votegaheneta.vote.entity.QVoteTeam;
import com.votegaheneta.vote.entity.SessionUserInfo;
import com.votegaheneta.vote.entity.VoteTeam;
import jakarta.persistence.EntityManager;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository("customVoteRepositoryImpl")  // 빈 이름 명시
public class CustomVoteRepositoryImpl implements CustomVoteRepository {

  private QElectionSession qElectionSession = electionSession;
  private QUsers qUsers = users;
  private QSessionUserInfo qSessionUserInfo = sessionUserInfo;
  private QVote qVote = vote;
  private QVoteTeam qVoteTeam = voteTeam;
  private QCandidate qCandidate = candidate;

  private final JPAQueryFactory queryFactory;
  @Autowired
  private JdbcTemplate jdbcTemplate;

  public CustomVoteRepositoryImpl(EntityManager em) {
    this.queryFactory = new JPAQueryFactory(em);
  }

  @Override
  public VoteDetailDto getVoteDetails(Long sessionId, Long voteId, Pageable pageable) {
    // 모든 Vote(X) 현재 속하지않은 투표말고 나머지 Vote를 가져옴
    List<Long> otherVoteIds = queryFactory.select(qVote.id)
        .from(qVote)
        .join(qVote.electionSession, qElectionSession)
        .where(qElectionSession.id.eq(sessionId).and(qVote.id.ne(voteId)))
        .fetch();

    // 다른 vote에 속한 candidate를 filterUserList로 써야함
    List<VoteTeam> otherVoteTeams = getVoteTeamList(otherVoteIds);
    List<VoteTeam> currVoteTeams = getVoteTeamList(Arrays.asList(voteId));

    List<Candidate> otherCandidateList = getCandidateList(otherVoteTeams);
    List<Candidate> currCandidateList = getCandidateList(currVoteTeams);

    List<Long> filteredUserIdList = otherCandidateList.stream()
        .map(candidate -> candidate.getUser().getId()).toList();

    List<Users> filteredSessionUsers = getFilteredSessionUsers(sessionId, filteredUserIdList,
        pageable);

    List<UserDto> filteredUserDtoList = filteredSessionUsers.stream().map(Users::toDto).toList();
    List<CandidateDto> currCandidateDtoList = currCandidateList.stream()
        .map(CandidateDto::fromEntity).toList();

    Map<Long, List<CandidateDto>> voteTeamMap = currCandidateDtoList.stream().collect(
        groupingBy(CandidateDto::getVoteTeamId));

    return new VoteDetailDto(filteredUserDtoList, voteTeamMap);
  }

  private List<Candidate> getCandidateList(List<VoteTeam> voteTeams) {
    return queryFactory.selectFrom(qCandidate)
        .join(qCandidate.user, qUsers).fetchJoin()
        .join(qCandidate.voteTeam, qVoteTeam).fetchJoin()
        .where(qVoteTeam.in(voteTeams))
        .fetch();
  }

  private List<VoteTeam> getVoteTeamList(List<Long> otherVotes) {
    return queryFactory.selectFrom(qVoteTeam)
        .join(qVoteTeam.vote, qVote)
        .where(qVote.id.in(otherVotes))
        .fetch();
  }


  private List<Users> getFilteredSessionUsers(Long sessionId, List<Long> filteredUserIdList,
      Pageable pageable) {
    List<SessionUserInfo> suiList = queryFactory.select(qSessionUserInfo)
        .from(qSessionUserInfo)
        .join(qSessionUserInfo.user).fetchJoin()
        .join(qSessionUserInfo.electionSession, qElectionSession)
        .where(qElectionSession.id.eq(sessionId)
            .and(qSessionUserInfo.user.id.notIn(filteredUserIdList)))
        .offset(pageable.getOffset())
        .limit(pageable.getPageSize())
        .fetch();
    return suiList.stream().map(SessionUserInfo::getUser).toList();
  }

  @Override
  public List<VoteResultProjection> findVoteResultBySessionId(Long sessionId) {
    return queryFactory.select(Projections.constructor(VoteResultProjection.class,
            qVote.id.as("voteId"),
            qVote.voteName.as("voteName"),
            qVoteTeam.id.as("voteTeamId"),
            qVoteTeam.prefix.as("prefix"),
            qVoteTeam.poster.as("poster"),
            qVoteTeam.pollCnt.as("pollCnt"),
            qVoteTeam.candidateStatement.as("candidateStatement"),
            qCandidate.id.as("candidateId"),
            qUsers.id.as("userId"),
            qUsers.username.as("userName")
        )).from(qElectionSession)
        .join(qVote).on(qElectionSession.id.eq(qVote.electionSession.id))
        .leftJoin(qVoteTeam).on(qVote.id.eq(qVoteTeam.vote.id))
        .leftJoin(qCandidate).on(qCandidate.voteTeam.id.eq(qVoteTeam.id))
        .leftJoin(qUsers).on(qCandidate.user.id.eq(qUsers.id))
        .where(qVote.electionSession.id.eq(sessionId))
        .orderBy(qVoteTeam.pollCnt.desc())
        .fetch();
  }
}
