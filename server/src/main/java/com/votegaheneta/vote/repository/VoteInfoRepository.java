package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.entity.VoteInfo;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface VoteInfoRepository extends JpaRepository<VoteInfo, Long> {

  @Query("select count(vi) > 0 from VoteInfo vi where vi.vote.id = :voteId and vi.user.id = :userId and vi.hasSelect = true")
  boolean existsVoteInfoByUserId(@Param("voteId") Long voteId, @Param("userId") Long userId);

  Optional<VoteInfo> findVoteInfoByVoteIdAndUserId(Long voteId, Long userId);
}