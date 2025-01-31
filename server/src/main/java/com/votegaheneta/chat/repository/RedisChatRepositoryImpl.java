package com.votegaheneta.chat.repository;

import com.votegaheneta.chat.dto.ChatDto;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class RedisChatRepositoryImpl implements RedisChatRepository {

  private final RedisTemplate<String, ChatDto> redisTemplate;
  private final ListOperations<String, ChatDto> listOps;

  private static final int MAX_SIZE = 10;

  public RedisChatRepositoryImpl(RedisTemplate<String, ChatDto> redisTemplate) {
    this.redisTemplate = redisTemplate;
    this.listOps = redisTemplate.opsForList();
  }

  /**
   * push와 trim를 한 트랜잭션 안에 넣어서 네트워크 왕복을 최소화함
   * @author 최효재
   */
  @Transactional
  @Override
  public void saveChat(String key, ChatDto chat) {
    listOps.leftPush(key, chat);
    listOps.trim(key, 0, MAX_SIZE);
  }

  @Override
  public List<ChatDto> getChatList(String key) {
    return listOps.range(key, 0, -1);
  }

  @Override
  public boolean deleteChatRoom(String key) {
    return redisTemplate.delete(key);
  }
}
