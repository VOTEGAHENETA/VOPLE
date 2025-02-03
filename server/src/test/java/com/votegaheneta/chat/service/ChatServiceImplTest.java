package com.votegaheneta.chat.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.votegaheneta.chat.dto.ChatDto;
import com.votegaheneta.chat.dto.ChatRoomDto;
import com.votegaheneta.chat.exception.InvalidChatRoomException;
import com.votegaheneta.common.repository.RedisRepository;
import com.votegaheneta.user.dto.UserDto;
import com.votegaheneta.user.entity.Users;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ChatServiceImplTest {

  @Autowired
  private RedisRepository redisRepository;

  @Autowired
  private ChatService chatService;

  private ChatDto chatDto;

  @BeforeEach
  void setUp() {
    Users user = Users.builder().username("홍길동").nickname("착한 사람").build();
    UserDto userDto = new UserDto(user);
    chatDto = new ChatDto();
    chatDto.setText("안녕하세요");
    chatDto.setUserInfo(userDto);
    redisRepository.delete("user:1");
  }

  @Test
  void saveChat() {
    redisRepository.saveInList("user:1", chatDto);
    List<ChatDto> chatList = redisRepository.getList("user:1");
    assertThat(chatList.size()).isEqualTo(1);
    assertThat(chatList.get(0).getNickname()).isEqualTo("착한 사람");
    assertThat(chatList.get(0).getText()).isEqualTo("안녕하세요");
  }

  @Test
  void deleteChatRoom() {
    redisRepository.saveInList("user:1", chatDto);
    List<ChatDto> chatList = redisRepository.getList("user:1");
    assertThat(chatList.size()).isEqualTo(1);
    redisRepository.delete("user:1");
    chatList = redisRepository.getList("user:1");
    assertThat(chatList.size()).isEqualTo(0);
  }

  @Test
  void WrongURL() {
    ChatRoomDto wrongTypeChatRoom = new ChatRoomDto(1L, "wrong ChatRoom");
    assertThrows(InvalidChatRoomException.class, () -> chatService.saveChat(wrongTypeChatRoom, chatDto));

    ChatRoomDto wrongRoomIdChatRoom = new ChatRoomDto(10000L, "session");
    assertThrows(InvalidChatRoomException.class, () -> chatService.saveChat(wrongRoomIdChatRoom, chatDto));
  }
}