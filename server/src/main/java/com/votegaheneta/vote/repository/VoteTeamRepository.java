package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.entity.VoteTeam;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface VoteTeamRepository extends JpaRepository<VoteTeam, Long> {

  @Query("select distinct vt from VoteTeam vt " +
      " join fetch vt.vote v " +
      " join fetch vt.candidates c " +
      " join fetch c.user u " +
      " where vt.vote.id in :voteIds" +
      " order by vt.pollCnt desc ")
  List<VoteTeam> findByVote_IdIn(@Param("voteIds")List<Long> voteIds);

  void deleteVoteTeamByVoteId(Long voteId);
  @Query("select vt "
      + " from VoteTeam vt "
      + " join fetch Candidate c "
      + " join fetch Users u "
      + " where vt.vote.id = :voteId "
      + " order by vt.pollCnt desc")
  List<VoteTeam> findByVoteId(@Param("voteId") Long voteId);

  @Query("select vt.id from VoteTeam vt where vt.vote.id = :voteId")
  List<Long> findIdsByVoteId(@Param("voteId") Long voteId);

  @Modifying
  @Query("DELETE FROM VoteTeam vt WHERE vt.vote.id = :voteId")
  void deleteByVoteId(@Param("voteId") Long voteId);

  @Query("select vt from VoteTeam vt join fetch vt.vote v join fetch v.electionSession es where vt.id = :voteTeamId")
  Optional<VoteTeam> findVoteTeamWithVoteAndElection(Long voteTeamId);
}