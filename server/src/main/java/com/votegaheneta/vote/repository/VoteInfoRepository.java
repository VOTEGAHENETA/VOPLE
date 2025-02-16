package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.entity.VoteInfo;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface VoteInfoRepository extends JpaRepository<VoteInfo, Long> {

  @Query("select vi.hasSelect from VoteInfo vi where vi.vote.id = :voteId and vi.user.id = :userId")
  Boolean existsVoteInfoByUserId(@Param("voteId") Long voteId, @Param("userId") Long userId);

  @Query("select vi from VoteInfo vi where vi.vote.id = :voteId and vi.user.id = :userId")
  Optional<VoteInfo> findVoteInfoByVoteIdAndUserId(@Param("voteId") Long voteId, @Param("userId") Long userId);

  @Query("select vi from VoteInfo vi where vi.vote.id = :voteId")
  List<VoteInfo> findAllByVoteId(Long voteId);

  @Modifying
  @Query("delete from VoteInfo vi where vi.vote.id = :voteId")
  void deleteAllBatchByVoteId(Long voteId);

  @Query("select vi.id from VoteInfo vi where vi.vote.id = :voteId")
  List<Long> findIdsByVoteId(@Param("voteId") Long voteId);



  @Modifying
  @Query("DELETE FROM VoteInfo vi WHERE vi.vote.id = :voteId")
  void deleteByVoteId(@Param("voteId") Long voteId);

}