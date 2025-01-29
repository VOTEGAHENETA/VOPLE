package com.votegaheneta.chat.service;

import com.votegaheneta.chat.dto.ChatDto;
import com.votegaheneta.chat.dto.ChatRoomDto;
import com.votegaheneta.chat.repository.RedisChatRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService2{

  private final RedisChatRepository redisChatRepository;

  @Override
  public void saveChat(ChatRoomDto chatRoomDto, ChatDto ChatDto) {
    redisChatRepository.saveChat(chatRoomDto, ChatDto);
  }

  @Override
  public List<ChatDto> getChatList(ChatRoomDto chatRoomDto) {
    return redisChatRepository.getChatList(chatRoomDto);
  }

  @Override
  public boolean deleteChatRoom(ChatRoomDto chatRoomDto) {
    return redisChatRepository.deleteChatRoom(chatRoomDto);
  }
}
