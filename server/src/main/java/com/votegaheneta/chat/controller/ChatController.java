package com.votegaheneta.chat.controller;

import com.votegaheneta.chat.dto.SessionChatDto;
import com.votegaheneta.chat.dto.UserChatDto;
import com.votegaheneta.chat.service.SessionChatService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
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

  @Autowired
  private SessionChatService sessionChatService;

  @MessageMapping("/{roomId}")
  @SendTo("/api/room/{roomId}")
  public SessionChatDto message(@DestinationVariable Long roomId, SessionChatDto sessionChatDto, UserChatDto userChatDto) {
    SessionChatDto result = sessionChatService.saveSessionChat(roomId, sessionChatDto, userChatDto);
    System.out.println("Message received: " + sessionChatDto);
    return result;
  }

  // Paging 없이 전체 채팅 내용을 가져오는 쿼리
  @GetMapping("/api/room/{roomId}")
  @ResponseBody
  public List<SessionChatDto> getChatList(@PathVariable Long roomId) {
   return sessionChatService.getChatList(roomId);
  }

  // Total Count 날라가는 쿼리
  @GetMapping("/api/v2/room/{roomId}")
  @ResponseBody
  public Page<SessionChatDto> getChatListByPage(@PathVariable Long roomId, @RequestParam Map<String, String> page) {
    return sessionChatService.getChatListByPage(roomId, page);
  }

  // 무한 스크롤 할때 쓰는 쿼리
  @GetMapping("/api/v3/room/{roomId}")
  @ResponseBody
  public Slice<SessionChatDto> getChatListBySlice(@PathVariable Long roomId, @RequestParam Map<String, String> page) {
    return sessionChatService.getChatListBySlice(roomId, page);
  }
}
