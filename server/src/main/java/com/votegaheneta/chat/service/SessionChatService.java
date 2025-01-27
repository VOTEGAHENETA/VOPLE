package com.votegaheneta.chat.service;

import com.votegaheneta.chat.dto.SessionChatDto;
import com.votegaheneta.chat.dto.UserChatDto;

public interface SessionChatService {
  SessionChatDto saveSessionChat(Long roomId, SessionChatDto sessionChatDto, UserChatDto userChatDto);
}
