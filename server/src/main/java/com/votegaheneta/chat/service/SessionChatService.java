package com.votegaheneta.chat.service;

import com.votegaheneta.chat.dto.SessionChatDto;
import com.votegaheneta.chat.dto.UserChatDto;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;

public interface SessionChatService {
  SessionChatDto saveSessionChat(Long roomId, SessionChatDto sessionChatDto, UserChatDto userChatDto);
  List<SessionChatDto> getChatList(Long roomId);
  Page<SessionChatDto> getChatListByPage(Long roomId, Map<String, String> page);
  Slice<SessionChatDto> getChatListBySlice(Long roomId, Map<String, String> page);
}
