package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.entity.VoteTeam;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface VoteTeamRepository extends JpaRepository<VoteTeam, Long> {

  @Query("select distinct vt from VoteTeam vt " +
      "join fetch vt.vote v " +
      "join fetch vt.candidates c " +
      "join fetch c.user u " +
      "where vt.vote.id in :voteIds")
  List<VoteTeam> findByVote_IdIn(@Param("voteIds")List<Long> voteIds);

  List<VoteTeam> findByVoteId(Long voteId);

  void deleteVoteTeamByVoteId(Long voteId);
}