package com.votegaheneta.vote.repository;

import static com.votegaheneta.user.entity.QUsers.users;
import static com.votegaheneta.vote.entity.QCandidate.candidate;
import static com.votegaheneta.vote.entity.QElectionSession.electionSession;
import static com.votegaheneta.vote.entity.QSessionUserInfo.sessionUserInfo;
import static com.votegaheneta.vote.entity.QVote.vote;
import static com.votegaheneta.vote.entity.QVoteInfo.voteInfo;
import static com.votegaheneta.vote.entity.QVoteTeam.voteTeam;
import static java.util.stream.Collectors.groupingBy;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.votegaheneta.user.dto.UserDto;
import com.votegaheneta.user.entity.QUsers;
import com.votegaheneta.user.entity.Users;
import com.votegaheneta.user.enums.USER_TYPE;
import com.votegaheneta.vote.dto.CandidateDto;
import com.votegaheneta.vote.dto.VoteDetailDto;
import com.votegaheneta.vote.dto.VoteResultProjection;
import com.votegaheneta.vote.entity.QCandidate;
import com.votegaheneta.vote.entity.QElectionSession;
import com.votegaheneta.vote.entity.QSessionUserInfo;
import com.votegaheneta.vote.entity.QVote;
import com.votegaheneta.vote.entity.QVoteInfo;
import com.votegaheneta.vote.entity.QVoteTeam;
import com.votegaheneta.vote.entity.VoteInfo;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


@Repository("customVoteRepositoryImpl")  // 빈 이름 명시
public class CustomVoteRepositoryImpl implements CustomVoteRepository {

  private QElectionSession qElectionSession = electionSession;
  private QUsers qUsers = users;
  private QSessionUserInfo qSessionUserInfo = sessionUserInfo;
  private QVote qVote = vote;
  private QVoteInfo qVoteInfo = voteInfo;
  private QVoteTeam qVoteTeam = voteTeam;
  private QCandidate qCandidate = candidate;

  private final JPAQueryFactory queryFactory;
  @Autowired
  private JdbcTemplate jdbcTemplate;

  public CustomVoteRepositoryImpl(EntityManager em) {
    this.queryFactory = new JPAQueryFactory(em);
  }


  private Map<Long, List<CandidateDto>> getCandidateList(Long sessionId, Long voteId) {
    List<CandidateDto> candidateList = queryFactory.select(
            Projections.constructor(CandidateDto.class,
                qVoteTeam.id, qUsers.id, qUsers.username))
        .from(qCandidate)
        .join(qCandidate.voteTeam, qVoteTeam)
        .join(qVoteTeam.vote, qVote)
        .join(qCandidate.user, qUsers)
        .where(qVote.electionSession.id.eq(sessionId).and(qVote.id.eq(voteId)))
        .fetch();

    Map<Long, List<CandidateDto>> voteTeamMap = candidateList.stream().collect(
        groupingBy(CandidateDto::getVoteTeamId));

    for (Map.Entry<Long, List<CandidateDto>> entry : voteTeamMap.entrySet()) {
      System.out.println("entry = " + entry.getKey() + ":" + entry.getValue());
    }

//    for (CandidateDto candidate : candidateList) {
//      System.out.println("candidate = " + candidate.getVoteTeamId() + ":" + candidate.getUsername());
//    }
    return voteTeamMap;
  }

  @Override
  public VoteDetailDto getVoteDetails(Long sessionId, Long voteId, Pageable pageable) {
    List<Users> filteredUserList = getVoteInfoList(sessionId);
    List<Users> users = getSessionUsers(sessionId, filteredUserList, pageable);
    System.out.println("origin size = " + users.size());
    users.removeAll(filteredUserList);
    System.out.println("filtered size = " + users.size());

    List<UserDto> userList = users.stream().map(Users::toDto).toList();
    Map<Long, List<CandidateDto>> candidateMap = getCandidateList(sessionId, voteId);
    return new VoteDetailDto(userList, candidateMap);
  }

  private List<Users> getVoteInfoList(Long sessionId) {
    List<VoteInfo> voteInfoList = queryFactory.selectFrom(qVoteInfo)
        .join(qVoteInfo.vote, qVote)
        .where(qVote.electionSession.id.eq(sessionId))
        .fetch();
    System.out.println("voteInfoList = " + voteInfoList.size());
    List<Users> filteredUser = voteInfoList.stream()
        .filter(voteInfo -> voteInfo.getUserType() == USER_TYPE.CANDIDATE).map(
            VoteInfo::getUser).toList();

    for (Users users : filteredUser) {
      System.out.println("users = " + users);
    }
    return filteredUser;
  }

  private List<Users> getSessionUsers(Long sessionId, List<Users> filteredUserList,
      Pageable pageable) {
    List<Users> users = queryFactory.select(qUsers)
        .from(qSessionUserInfo)
        .join(qSessionUserInfo.user, qUsers)
        .join(qSessionUserInfo.electionSession, qElectionSession)
        .where(qElectionSession.id.eq(sessionId).and(qSessionUserInfo.user.notIn(filteredUserList)))
        .offset(pageable.getOffset())
        .limit(pageable.getPageSize())
        .fetch();
    for (Users user : users) {
      System.out.println("user = " + user);
    }
    return users;
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


  /**
   * JPA ID IDENTITY 전략과 Batch Insert는 양립 불가능
   */
  @Override
  @Transactional(propagation = Propagation.REQUIRED)
  public long batchInsertVoteInfoList(List<VoteInfo> voteInfoList) {
//    String sql = "insert into vote_info (user_id, vote_id, user_type, has_select) values (?, ?, ?, ?)";
//    jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
//      @Override
//      public void setValues(PreparedStatement ps, int i) throws SQLException {
//        VoteInfo voteInfo = voteInfoList.get(i);
//        ps.setLong(1, voteInfo.getUser().getId());
//        ps.setLong(2, voteInfo.getVote().getId());
//        ps.setString(3, voteInfo.getUserType().name());
//        ps.setBoolean(4, voteInfo.isHasSelect());
//      }
//      @Override
//      public int getBatchSize() {
//        return voteInfoList.size();
//      }
//    });
    return 0;
  }
}
