package com.votegaheneta.stream.repository;

import com.votegaheneta.stream.entity.Stream;
import com.votegaheneta.vote.entity.VoteTeam;
import java.util.List;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StreamRepository extends JpaRepository<Stream, Long> {

  @Modifying
  @Query("delete from Stream s where s.voteTeam in :voteTeams")
  void deleteAllStreamByVoteTeam(@Param("voteTeams") List<VoteTeam> voteTeams);

  @Query("select s from Stream s where s.voteTeam.id in :teamIds")
  List<Stream> findByTeamIds(@Param("teamIds") Set<Long> teamIds);
}