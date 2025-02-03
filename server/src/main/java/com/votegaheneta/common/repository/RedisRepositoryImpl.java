package com.votegaheneta.common.repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class RedisRepositoryImpl implements RedisRepository {

  private final RedisTemplate<String, Object> redisTemplate;
  private final ListOperations<String, Object> listOps;



  public <T> RedisRepositoryImpl(RedisTemplate<String, Object> redisTemplate) {
    this.redisTemplate = redisTemplate;
    this.listOps = redisTemplate.opsForList();
  }

  @Override
  public <T> void saveInSet(String key, T value) {
    redisTemplate.opsForSet().add(key, value);
  }

  @Override
  public <T> void saveInList(String key, T value) {
    listOps.leftPush(key, value);
  }

  @Override
  public <T> List<T> getList(String key) {
    return (List<T>) listOps.range(key, 0, -1);
  }

  @Override
  public void trim(String key, int start, int end) {
    listOps.trim(key, start, end);
  }

  @Override
  public boolean delete(String key) {
    return redisTemplate.delete(key);
  }

  @Override
  public boolean containsKey(String key) {
    return redisTemplate.hasKey(key);
  }

  @Override
  public <T> boolean containsKeyInSet(String key, T value) {
    return redisTemplate.opsForSet().isMember(key, value);
  }

  @Override
  public void setExpire(String key, long timeout, TimeUnit timeUnit) {
    redisTemplate.expire(key, timeout, timeUnit);
  }

  @Override
  public <T> Optional<T> get(String key) {
    return Optional.ofNullable((T) redisTemplate.opsForValue().get(key));
  }

  @Override
  public <T> void saveInValue(String key, T value) {
    redisTemplate.opsForValue().set(key, value);
  }

  /**
   * push와 trim를 한 트랜잭션 안에 넣어서 네트워크 왕복을 최소화함
   * @author 최효재
   */
//  @Transactional
//  @Override
//  public void push(String key, String value) {
//    listOps.leftPush(key, value);
//    listOps.trim(key, 0, MAX_SIZE);
//  }
//
//  @Override
//  public List<ChatDto> getChatList(String key) {
//    return listOps.range(key, 0, -1);
//  }
//
//  @Override
//  public boolean deleteChatRoom(String key) {
//    return redisTemplate.delete(key);
//  }
}
