package com.votegaheneta.chat.controller;

import com.votegaheneta.chat.dto.SessionChatDto;
import com.votegaheneta.chat.dto.UserChatDto;
import com.votegaheneta.chat.service.SessionChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

  @Autowired
  private SessionChatService sessionChatService;

  public ChatController() {
    System.out.println("ChatController initialized");
  }

  @MessageMapping("/{roomId}")
  @SendTo("/api/room/{roomId}")
  public SessionChatDto message(@DestinationVariable Long roomId, SessionChatDto sessionChatDto, UserChatDto userChatDto) {
    SessionChatDto result = sessionChatService.saveSessionChat(roomId, sessionChatDto, userChatDto);
    System.out.println("Message received: " + sessionChatDto);
    return result;
  }
}
