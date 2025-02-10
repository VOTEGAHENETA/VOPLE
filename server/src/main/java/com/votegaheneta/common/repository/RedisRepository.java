package com.votegaheneta.common.repository;

import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

public interface RedisRepository {


  <T> void saveInValue(String key, T value);
  <T> void saveInSet(String key, T value);
  <T> void saveInList(String key, T value);
  <T> List<T> getList(String key);
  <T> Optional<T> get (String key);
  void trim(String key, int start, int end);
  void setExpire(String key, long timeout, TimeUnit timeUnit);
  boolean containsKey(String key);
  <T> boolean containsKeyInSet(String key, T value);
  boolean delete(String key);
  void saveVoteResults(String key, List<VoteResult> voteResults);
  List<VoteResult> getVoteResults(String key);
}
