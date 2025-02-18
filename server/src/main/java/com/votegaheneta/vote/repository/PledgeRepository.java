package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.entity.Pledge;
import com.votegaheneta.vote.entity.VoteTeam;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PledgeRepository extends JpaRepository<Pledge, Long> {

  @Modifying
  @Query("delete from Pledge p where p.voteTeam.id = :voteTeamId")
  void deleteAllByVoteTeamId(@Param("voteTeamId") Long voteTeamId);

  @Query("select p.id from Pledge p where p.voteTeam.id in :voteTeamIds")
  List<Long> findIdsByVoteTeamIds(@Param("voteTeamIds") List<Long> voteTeamIds);
  // 엔티티 사용

  @Modifying
  @Query("DELETE FROM Pledge p WHERE p.voteTeam.vote.id = :voteId")
  void deleteByVoteId(@Param("voteId") Long voteId);

  @Modifying
  @Query("DELETE FROM Pledge p WHERE p.voteTeam in :voteTeams")
  void deleteAllPledgeByVoteTeam(List<VoteTeam> voteTeams);
}