package com.votegaheneta.chat.repository;

import com.votegaheneta.chat.dto.ChatDto;
import com.votegaheneta.chat.dto.ChatRoomDto;
import java.util.List;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class RedisChatRepository {

  private final RedisTemplate<String, ChatDto> redisTemplate;
  private final ListOperations<String, ChatDto> listOps;

  private static final int MAX_SIZE = 100;

  public RedisChatRepository(RedisTemplate<String, ChatDto> redisTemplate) {
    this.redisTemplate = redisTemplate;
    this.listOps = redisTemplate.opsForList();
  }

  private String generateKey(ChatRoomDto chatRoom) {
    return String.format("%s:%d", chatRoom.getType(), chatRoom.getRoomId());
  }

  public void saveChat(ChatRoomDto chatRoom, ChatDto chat) {
    String key = generateKey(chatRoom);
    listOps.leftPush(key, chat);
    listOps.trim(key, 0, MAX_SIZE);
  }

  public List<ChatDto> getChatList(ChatRoomDto chatRoom) {
    String key = generateKey(chatRoom);
    return listOps.range(key, 0, -1);
  }

  public boolean deleteChatRoom(ChatRoomDto chatRoom) {
    String key = generateKey(chatRoom);
    return redisTemplate.delete(key);
  }
}
