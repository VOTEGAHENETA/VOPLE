package com.votegaheneta.vote.repository;

//import com.votegaheneta.vote.dto.VoteResultProjection;

import com.votegaheneta.vote.dto.VoteResultProjection;
import com.votegaheneta.vote.entity.Vote;
import com.votegaheneta.vote.entity.VoteTeam;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VoteRepository extends JpaRepository<Vote, Long>, CustomVoteRepository {

  @Query("select v from Vote v where v.electionSession.id = :sessionId")
  List<Vote> findVoteBySessionId(@Param("sessionId") Long sessionId);

  @Query("select vt from VoteTeam vt join fetch vt.candidates c join fetch c.user u where vt.vote.id = :voteId order by vt.pollCnt desc ")
  List<VoteTeam> findVoteTeamWithCandidateByVoteId(@Param("voteId") Long voteId);


  // order by 하는 로직을 만들어야하는데 JPQL로는 한계가 있을것 같아 QueryDSL을 사용해서 로직을 다시 짬
  @Query(value = "select "
                 + " v.id as voteId, v.voteName as voteName, vt.id as voteTeamId, "
                 + " vt.prefix as prefix, vt.poster as poster, vt.pollCnt as pollCnt, "
                 + " vt.candidateStatement as candidateStatement, c.id as candidateId, u.id as userId, u.username as userName"
                 + " from Vote v "
                 + " join VoteTeam vt on v.id = vt.vote.id "
                 + " join Candidate c on c.voteTeam.id = vt.id "
                 + " join Users u on c.user.id = u.id "
                 + " where v.electionSession.id = :sessionId")
    List<VoteResultProjection> findVotesBySessionId(@Param("sessionId") Long sessionId);

}