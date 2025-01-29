package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.entity.Vote;
import com.votegaheneta.vote.entity.VoteTeam;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VoteRepository extends JpaRepository<Vote, Long> {

  @Query("select vt from VoteTeam vt join fetch vt.candidates c join fetch c.user u where vt.vote.id = :voteId")
  List<VoteTeam> findVoteTeamWithCandidateByVoteId(@Param("voteId") Long voteId);

}