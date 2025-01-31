package com.votegaheneta.chat.service;

import com.votegaheneta.chat.dto.ChatDto;
import com.votegaheneta.chat.dto.ChatRoomDto;
import com.votegaheneta.chat.repository.RedisChatRepository;
import com.votegaheneta.user.entity.Users;
import com.votegaheneta.user.repository.UsersRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{

  private final RedisChatRepository redisChatRepository;
  private final UsersRepository usersRepository;

  private String generateKey(ChatRoomDto chatRoom) {
    return String.format("%s:%d", chatRoom.getType(), chatRoom.getRoomId());
  }

  @Override
  public void saveChat(ChatRoomDto chatRoomDto, ChatDto chatDto) {
    String key = generateKey(chatRoomDto);
    Users user = usersRepository.findById(chatDto.getUserId()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));
    chatDto.setUserInfo(user);
    redisChatRepository.saveChat(key, chatDto);
  }

  @Override
  public List<ChatDto> getChatList(ChatRoomDto chatRoomDto) {
    String key = generateKey(chatRoomDto);
    return redisChatRepository.getChatList(key);
  }

  @Override
  public boolean deleteChatRoom(ChatRoomDto chatRoomDto) {
    String key = generateKey(chatRoomDto);
    return redisChatRepository.deleteChatRoom(key);
  }
}
