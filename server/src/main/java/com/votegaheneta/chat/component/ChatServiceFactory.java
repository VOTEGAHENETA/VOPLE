package com.votegaheneta.chat.component;

import com.votegaheneta.chat.service.ChatService;
import com.votegaheneta.chat.service.SessionChatServiceImpl;
import com.votegaheneta.chat.service.TeamChatServiceImpl;
import org.springframework.stereotype.Component;

@Component
public class ChatServiceFactory {

  private final SessionChatServiceImpl sessionChatService;
  private final TeamChatServiceImpl teamChatService;

  public ChatServiceFactory(SessionChatServiceImpl sessionChatService, TeamChatServiceImpl teamChatService) {
    this.sessionChatService = sessionChatService;
    this.teamChatService = teamChatService;
  }

  public ChatService getChatService(String chatType) {
    if (chatType.equals("session")) {
      return sessionChatService;
    } else if (chatType.equals("team")) {
      return teamChatService;
    } else {
      throw new IllegalArgumentException("Invalid chat type");
    }
  }
}
