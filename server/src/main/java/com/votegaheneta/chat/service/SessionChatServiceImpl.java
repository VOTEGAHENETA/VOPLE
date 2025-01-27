package com.votegaheneta.chat.service;

import com.votegaheneta.chat.dto.SessionChatDto;
import com.votegaheneta.chat.dto.UserChatDto;
import com.votegaheneta.chat.entity.SessionChat;
import com.votegaheneta.chat.entity.SessionChatRoom;
import com.votegaheneta.chat.repository.SessionChatRepository;
import com.votegaheneta.chat.repository.SessionChatRoomRepository;
import com.votegaheneta.user.entity.Users;
import com.votegaheneta.user.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class SessionChatServiceImpl implements SessionChatService {

  private final SessionChatRoomRepository sessionChatRoomRepository;
  private final SessionChatRepository sessionChatRepository;
  private final UsersRepository usersRepository;

  public SessionChatDto saveSessionChat(Long roomId, SessionChatDto sessionChatDto, UserChatDto userChatDto) {
    SessionChatRoom sessionChatRoom = sessionChatRoomRepository.findById(roomId).orElseThrow(() -> new IllegalArgumentException("Invalid room id"));
    Users user = usersRepository.findById(userChatDto.getUserId()).orElseThrow(() -> new IllegalArgumentException("Invalid user id"));
    SessionChat sessionChat = SessionChat.createSessionChat(sessionChatRoom, user, sessionChatDto.getText());
    sessionChatRepository.save(sessionChat);
    return new SessionChatDto(sessionChat);
  }
}
