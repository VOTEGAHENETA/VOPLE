package com.votegaheneta.chat.service;

import com.votegaheneta.chat.dto.ChatDto;
import com.votegaheneta.chat.dto.UserChatDto;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;

public interface ChatService {
  ChatDto saveChat(Long roomId, ChatDto ChatDto, UserChatDto userChatDto);
  List<ChatDto> getChatList(Long roomId);
  Page<ChatDto> getChatListByPage(Long roomId, Map<String, String> page);
  Slice<ChatDto> getChatListBySlice(Long roomId, Map<String, String> page);
}
