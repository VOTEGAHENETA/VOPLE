package com.votegaheneta.chat.service;

import com.votegaheneta.chat.dto.ChatDto;
import com.votegaheneta.chat.dto.UserChatDto;
import com.votegaheneta.chat.entity.TeamChat;
import com.votegaheneta.chat.entity.TeamChatRoom;
import com.votegaheneta.chat.repository.TeamChatRepository;
import com.votegaheneta.chat.repository.TeamChatRoomRepository;
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
public class TeamChatServiceImpl implements ChatService {

  private final TeamChatRoomRepository teamChatRoomRepository;
  private final TeamChatRepository teamChatRepository;
  private final UsersRepository usersRepository;

  @Value("${paging.default-page-size}")
  private String DEFAULT_PAGE_SIZE;

  @Value("${paging.default-page-number}")
  private String DEFALUT_PAGE_NUMBER;


  public ChatDto saveChat(Long roomId, ChatDto ChatDto, UserChatDto userChatDto) {
    TeamChatRoom teamChatRoom = teamChatRoomRepository.findById(roomId).orElseThrow(() -> new IllegalArgumentException("Invalid room id"));
    Users user = usersRepository.findById(userChatDto.getUserId()).orElseThrow(() -> new IllegalArgumentException("Invalid user id"));
    TeamChat teamChat = TeamChat.createTeamChat(teamChatRoom, user, ChatDto.getText());
    teamChatRepository.save(teamChat);
    return new ChatDto(teamChat);
  }

  @Override
  public List<ChatDto> getChatList(Long roomId) {
    List<TeamChat> teamChats = teamChatRepository.findChatsByRoomId(roomId);
    return teamChats.stream().map(ChatDto::new).toList();
  }

  @Override
  public Page<ChatDto> getChatListByPage(Long roomId, Map<String, String> pageMap) {
    int page = Integer.parseInt(pageMap.getOrDefault("page", DEFALUT_PAGE_NUMBER));
    int size = Integer.parseInt(pageMap.getOrDefault("size", DEFAULT_PAGE_SIZE));
    PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
    Page<TeamChat> teamChats = teamChatRepository.findChatsPageByRoomId(roomId, pageRequest);
    return teamChats.map(ChatDto::new);
  }

  @Override
  public Slice<ChatDto> getChatListBySlice(Long roomId, Map<String, String> pageMap) {
    int page = Integer.parseInt(pageMap.getOrDefault("page", DEFALUT_PAGE_NUMBER));
    int size = Integer.parseInt(pageMap.getOrDefault("size", DEFAULT_PAGE_SIZE));
    PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
    Slice<TeamChat> teamChats = teamChatRepository.findChatsSliceByRoomId(roomId, pageRequest);
    return teamChats.map(ChatDto::new);
  }
}
