package com.votegaheneta.stream.repository;

import com.votegaheneta.stream.entity.Stream;
import com.votegaheneta.vote.entity.VoteTeam;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface StreamRepository extends JpaRepository<Stream, Long> {

  @Modifying
  @Query("delete from Stream s where s.voteTeam in :voteTeams")
  void deleteAllStreamByVoteTeam(List<VoteTeam> voteTeams);
}