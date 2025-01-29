package com.votegaheneta.chat.service;

import com.votegaheneta.chat.dto.ChatDto;
import com.votegaheneta.chat.dto.ChatRoomDto;
import java.util.List;

public interface ChatService2 {
  void saveChat(ChatRoomDto chatRoomDto, ChatDto ChatDto);
  List<ChatDto> getChatList(ChatRoomDto chatRoomDto);
  boolean deleteChatRoom(ChatRoomDto chatRoomDto);
}
