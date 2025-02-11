package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.entity.Pledge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PledgeRepository extends JpaRepository<Pledge, Long> {

  @Modifying
  @Query("delete from Pledge p where p.voteTeam.id = :voteTeamId")
  void deleteAllByVoteTeamId(@Param("voteTeamId") Long voteTeamId);
  // 엔티티 사용

}