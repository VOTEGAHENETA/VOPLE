package com.votegaheneta.vote.mapper;


import com.votegaheneta.vote.entity.VoteInfo;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface VoteInfoMapper {
  void batchInsertVoteInfo(List<VoteInfo> voteInfoList);
}
