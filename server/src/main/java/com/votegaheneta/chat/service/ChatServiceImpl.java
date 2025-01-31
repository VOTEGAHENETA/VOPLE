package com.votegaheneta.chat.service;

import com.votegaheneta.chat.dto.ChatDto;
import com.votegaheneta.chat.dto.ChatRoomDto;
import com.votegaheneta.chat.repository.RedisChatRepository;
import com.votegaheneta.user.dto.UserDto;
import com.votegaheneta.user.entity.Users;
import com.votegaheneta.user.repository.RedisUserRepository;
import com.votegaheneta.user.repository.UsersRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{

  private final RedisChatRepository redisChatRepository;
  private final UsersRepository usersRepository;
  private final RedisUserRepository redisUserRepository;

  private String generateChatKey(ChatRoomDto chatRoom) {
    return String.format("%s:%d", chatRoom.getType(), chatRoom.getRoomId());
  }

  private String generateUserKey(Long userId) {
    return String.format("user:%d", userId);
  }

  @Override
  public void saveChat(ChatRoomDto chatRoomDto, ChatDto chatDto) {
    String key = generateChatKey(chatRoomDto);
    String userKey = generateUserKey(chatDto.getUserId());
    Optional<UserDto> optUserDto = redisUserRepository.getUser(userKey);
    if (optUserDto.isPresent()) {
      chatDto.setUserInfo(optUserDto.get());
      redisChatRepository.saveChat(key, chatDto);
    } else {
      Users user = usersRepository.findById(chatDto.getUserId()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));
      UserDto userDto = new UserDto(user);
      chatDto.setUserInfo(userDto);
      redisUserRepository.saveUser(userKey, userDto);
      redisChatRepository.saveChat(key, chatDto);
    }
  }

  @Override
  public List<ChatDto> getChatList(ChatRoomDto chatRoomDto) {
    String key = generateChatKey(chatRoomDto);
    return redisChatRepository.getChatList(key);
  }

  @Override
  public boolean deleteChatRoom(ChatRoomDto chatRoomDto) {
    String key = generateChatKey(chatRoomDto);
    return redisChatRepository.deleteChatRoom(key);
  }
}
