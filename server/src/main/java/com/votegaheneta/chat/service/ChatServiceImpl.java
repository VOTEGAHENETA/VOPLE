package com.votegaheneta.chat.service;

import static java.util.concurrent.TimeUnit.SECONDS;

import com.votegaheneta.chat.dto.ChatDto;
import com.votegaheneta.chat.dto.ChatRoomDto;
import com.votegaheneta.chat.exception.InvalidChatRoomException;
import com.votegaheneta.common.repository.RedisRepository;
import com.votegaheneta.user.dto.UserDto;
import com.votegaheneta.user.entity.Users;
import com.votegaheneta.user.repository.UsersRepository;
import com.votegaheneta.vote.repository.ElectionSessionRepository;
import com.votegaheneta.vote.repository.VoteTeamRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

  private final RedisRepository redisRepository;
  private final UsersRepository usersRepository;

  private final ElectionSessionRepository electionSessionRepository;
  private final VoteTeamRepository voteTeamRepository;

  private static final int EXPIRATION_TIME = 30;
  private static final int MAX_SIZE = 10;

  private String generateChatRoomKey(ChatRoomDto chatRoom) {
    return String.format("CHAT_ROOM:%s", chatRoom.getType().toUpperCase());
  }

  private String generateChatKey(ChatRoomDto chatRoom) {
    return String.format("CHAT:%s:%d", chatRoom.getType().toUpperCase(), chatRoom.getRoomId());
  }

  private String generateUserKey(Long userId) {
    return String.format("USER:%d", userId);
  }

  private void validateChatRoomKey(ChatRoomDto chatRoom)
      throws InvalidChatRoomException {
    String type = chatRoom.getType().toUpperCase();
    Long roomId = chatRoom.getRoomId();

    // 아예 잘못된 입력값이 들어오면 예외 발생
    if (!type.equals("SESSION") && !type.equals("TEAM")) {
      throw new InvalidChatRoomException("잘못된 입력입니다");
    }

    // 이미 존재하는 채팅방이면 return
    String chatRoomKey = generateChatRoomKey(chatRoom);
    if (redisRepository.containsKeyInSet(chatRoomKey, roomId)) {
      return;
    }

    // DB에 실제 존재하는 채팅방인지 확인
    switch (type.toUpperCase()) {
      case "SESSION" -> electionSessionRepository.findById(roomId)
          .orElseThrow(() -> new InvalidChatRoomException("존재하지 않는 세션입니다."));
      case "TEAM" -> voteTeamRepository.findById(roomId)
          .orElseThrow(() -> new InvalidChatRoomException("존재하지 않는 팀입니다."));
      default -> throw new InvalidChatRoomException("잘못된 입력입니다");
    }

    // 레디스에 채팅방 정보 저장
    redisRepository.saveInSet(chatRoomKey, roomId);
  }

  @Override
  public void saveChat(ChatRoomDto chatRoomDto, ChatDto chatDto) throws InvalidChatRoomException {
    validateChatRoomKey(chatRoomDto);
    String key = generateChatKey(chatRoomDto);
    String userKey = generateUserKey(chatDto.getUserId());
    Optional<UserDto> optUserDto = redisRepository.get(userKey);
    UserDto userDto;

    if (optUserDto.isPresent()) {
      userDto = optUserDto.get();
      redisRepository.setExpire(userKey, EXPIRATION_TIME, SECONDS);
    } else {
      Users user = usersRepository.findById(chatDto.getUserId())
          .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));
      userDto = new UserDto(user);
      redisRepository.saveInValue(userKey, userDto);
      redisRepository.setExpire(userKey, EXPIRATION_TIME, SECONDS);
    }

    chatDto.setUserInfo(userDto);
    redisRepository.saveInList(key, chatDto);
    redisRepository.trim(key, 0, MAX_SIZE);
  }

  @Override
  public List<ChatDto> getChatList(ChatRoomDto chatRoomDto) throws InvalidChatRoomException {
    validateChatRoomKey(chatRoomDto);
    String key = generateChatKey(chatRoomDto);
    return redisRepository.getList(key);
  }

  @Override
  public boolean deleteChatRoom(ChatRoomDto chatRoomDto) throws InvalidChatRoomException {
    validateChatRoomKey(chatRoomDto);
    String key = generateChatKey(chatRoomDto);
    return redisRepository.delete(key);
  }
}
