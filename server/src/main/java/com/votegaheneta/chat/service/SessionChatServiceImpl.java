package com.votegaheneta.chat.service;

import com.votegaheneta.chat.dto.SessionChatDto;
import com.votegaheneta.chat.dto.UserChatDto;
import com.votegaheneta.chat.entity.SessionChat;
import com.votegaheneta.chat.entity.SessionChatRoom;
import com.votegaheneta.chat.repository.SessionChatRepository;
import com.votegaheneta.chat.repository.SessionChatRoomRepository;
import com.votegaheneta.user.entity.Users;
import com.votegaheneta.user.repository.UsersRepository;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class SessionChatServiceImpl implements SessionChatService {

  private final SessionChatRoomRepository sessionChatRoomRepository;
  private final SessionChatRepository sessionChatRepository;
  private final UsersRepository usersRepository;

  @Value("${paging.default-page-size}")
  private String DEFAULT_PAGE_SIZE;

  @Value("${paging.default-page-number}")
  private String DEFALUT_PAGE_NUMBER;


  public SessionChatDto saveSessionChat(Long roomId, SessionChatDto sessionChatDto, UserChatDto userChatDto) {
    SessionChatRoom sessionChatRoom = sessionChatRoomRepository.findById(roomId).orElseThrow(() -> new IllegalArgumentException("Invalid room id"));
    Users user = usersRepository.findById(userChatDto.getUserId()).orElseThrow(() -> new IllegalArgumentException("Invalid user id"));
    SessionChat sessionChat = SessionChat.createSessionChat(sessionChatRoom, user, sessionChatDto.getText());
    sessionChatRepository.save(sessionChat);
    return new SessionChatDto(sessionChat);
  }

  @Override
  public List<SessionChatDto> getChatList(Long roomId) {
    List<SessionChat> sessionChats = sessionChatRepository.findChatsByRoomId(roomId);
    return sessionChats.stream().map(SessionChatDto::new).toList();
  }

  @Override
  public Page<SessionChatDto> getChatListByPage(Long roomId, Map<String, String> pageMap) {
    int page = Integer.parseInt(pageMap.getOrDefault("page", DEFALUT_PAGE_NUMBER));
    int size = Integer.parseInt(pageMap.getOrDefault("size", DEFAULT_PAGE_SIZE));
    PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
    Page<SessionChat> sessionChats = sessionChatRepository.findChatsPageByRoomId(roomId, pageRequest);
    return sessionChats.map(SessionChatDto::new);
  }

  @Override
  public Slice<SessionChatDto> getChatListBySlice(Long roomId, Map<String, String> pageMap) {
    int page = Integer.parseInt(pageMap.getOrDefault("page", DEFALUT_PAGE_NUMBER));
    int size = Integer.parseInt(pageMap.getOrDefault("size", DEFAULT_PAGE_SIZE));
    PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
    Slice<SessionChat> sessionChats = sessionChatRepository.findChatsSliceByRoomId(roomId, pageRequest);
    return sessionChats.map(SessionChatDto::new);
  }
}
