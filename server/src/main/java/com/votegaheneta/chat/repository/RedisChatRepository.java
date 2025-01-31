package com.votegaheneta.chat.repository;

import com.votegaheneta.chat.dto.ChatDto;
import java.util.List;

public interface RedisChatRepository {

  void saveChat(String key, ChatDto chat);
  List<ChatDto> getChatList(String key);
  boolean deleteChatRoom(String key);
}
