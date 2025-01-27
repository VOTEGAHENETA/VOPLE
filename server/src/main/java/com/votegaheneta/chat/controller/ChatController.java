package com.votegaheneta.chat.controller;

import com.votegaheneta.chat.component.ChatServiceFactory;
import com.votegaheneta.chat.dto.ChatDto;
import com.votegaheneta.chat.dto.UserChatDto;
import com.votegaheneta.chat.service.ChatService;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ChatController {

  private final ChatServiceFactory chatServiceFactory;

  public ChatController(ChatServiceFactory chatServiceFactory) {
    this.chatServiceFactory = chatServiceFactory;
  }

  @MessageMapping("/{type}/{roomId}")
  @SendTo("/api/room/{type}/{roomId}")
  public ChatDto SessionChat(@DestinationVariable String type, @DestinationVariable Long roomId,
                             ChatDto ChatDto, UserChatDto userChatDto) {
    ChatService chatService = chatServiceFactory.getChatService(type);
    ChatDto result = chatService.saveChat(roomId, ChatDto, userChatDto);
    System.out.println("Message received: " + ChatDto);
    return result;
  }

  // Paging 없이 전체 채팅 내용을 가져오는 쿼리
  @GetMapping("/api/room/{type}/{roomId}")
  @ResponseBody
  public List<ChatDto> getChatList(@PathVariable String type, @PathVariable Long roomId) {
    ChatService chatService = chatServiceFactory.getChatService(type);
    return chatService.getChatList(roomId);
  }

  // Total Count 날라가는 쿼리
  @GetMapping("/api/v2/room/{type}/{roomId}")
  @ResponseBody
  public Page<ChatDto> getChatListByPage(@PathVariable String type, @PathVariable Long roomId,
                                         @RequestParam Map<String, String> page) {
    ChatService chatService = chatServiceFactory.getChatService(type);
    return chatService.getChatListByPage(roomId, page);
  }

  // 무한 스크롤 할때 쓰는 쿼리
  @GetMapping("/api/v3/room/{type}/{roomId}")
  @ResponseBody
  public Slice<ChatDto> getChatListBySlice(@PathVariable String type, @PathVariable Long roomId,
                                           @RequestParam Map<String, String> page) {
    ChatService chatService = chatServiceFactory.getChatService(type);
    return chatService.getChatListBySlice(roomId, page);
  }
}
