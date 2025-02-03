package com.votegaheneta.chat.service;

import com.votegaheneta.chat.dto.ChatDto;
import com.votegaheneta.chat.dto.ChatRoomDto;
import com.votegaheneta.chat.exception.InvalidChatRoomException;
import com.votegaheneta.chat.repository.RedisChatRepository;
import com.votegaheneta.user.dto.UserDto;
import com.votegaheneta.user.entity.Users;
import com.votegaheneta.user.repository.RedisUserRepository;
import com.votegaheneta.user.repository.UsersRepository;
import com.votegaheneta.vote.repository.ElectionSessionRepository;
import com.votegaheneta.vote.repository.VoteTeamRepository;
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

  private final ElectionSessionRepository electionSessionRepository;
  private final VoteTeamRepository voteTeamRepository;

  private static final int EXPIRATION_TIME = 30;

  private String generateChatKey(ChatRoomDto chatRoom) {
    return String.format("%s:%d", chatRoom.getType().toUpperCase(), chatRoom.getRoomId());
  }

  private String generateUserKey(Long userId) {
    return String.format("USER:%d", userId);
  }

  private void HandleInvalidChatRoomException(ChatRoomDto chatRoomDto) throws InvalidChatRoomException {
    String type = chatRoomDto.getType();
    Long roomId = chatRoomDto.getRoomId();

    switch (type.toUpperCase()) {
      case "SESSION" -> electionSessionRepository.findById(roomId).orElseThrow(() -> new InvalidChatRoomException("존재하지 않는 세션입니다."));
      case "TEAM" -> voteTeamRepository.findById(roomId).orElseThrow(() -> new InvalidChatRoomException("존재하지 않는 팀입니다."));
      default -> throw new InvalidChatRoomException("잘못된 입력입니다");
    }
  }

  @Override
  public void saveChat(ChatRoomDto chatRoomDto, ChatDto chatDto) throws InvalidChatRoomException{
    HandleInvalidChatRoomException(chatRoomDto);
    String key = generateChatKey(chatRoomDto);
    String userKey = generateUserKey(chatDto.getUserId());
    Optional<UserDto> optUserDto = redisUserRepository.getUser(userKey);
    UserDto userDto;

    if (optUserDto.isPresent()) {
      userDto = optUserDto.get();
      redisUserRepository.setExpire(userKey, EXPIRATION_TIME);
    } else {
      Users user = usersRepository.findById(chatDto.getUserId()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));
      userDto = new UserDto(user);
      redisUserRepository.saveUser(userKey, userDto);
    }

    chatDto.setUserInfo(userDto);
    redisChatRepository.saveChat(key, chatDto);
  }

  @Override
  public List<ChatDto> getChatList(ChatRoomDto chatRoomDto) throws InvalidChatRoomException {
    HandleInvalidChatRoomException(chatRoomDto);
    String key = generateChatKey(chatRoomDto);
    return redisChatRepository.getChatList(key);
  }

  @Override
  public boolean deleteChatRoom(ChatRoomDto chatRoomDto) throws InvalidChatRoomException{
    HandleInvalidChatRoomException(chatRoomDto);
    String key = generateChatKey(chatRoomDto);
    return redisChatRepository.deleteChatRoom(key);
  }
}
