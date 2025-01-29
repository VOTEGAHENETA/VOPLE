package com.votegaheneta.chat.controller;

import com.votegaheneta.chat.dto.ChatDto;
import com.votegaheneta.chat.dto.ChatRoomDto;
import com.votegaheneta.chat.service.ChatService2;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
public class ChatController {

//  private final ChatServiceFactory chatServiceFactory;
  private final ChatService2 chatService2;

  @MessageMapping("/{type}/{roomId}")
  @SendTo("/api/room/{type}/{roomId}")
  public ChatDto SessionChat(@DestinationVariable String type,
                             @DestinationVariable Long roomId,
                             ChatDto chatDto) {
    chatService2.saveChat(new ChatRoomDto(roomId, type), chatDto);
    return chatDto;
  }

  // Paging 없이 전체 채팅 내용을 가져오는 쿼리
  @GetMapping("/api/room/{type}/{roomId}")
  @ResponseBody
  public List<ChatDto> getChatList(@PathVariable String type, @PathVariable Long roomId) {
    return chatService2.getChatList(new ChatRoomDto(roomId, type));
  }

  // 성능 테스트 1000개 채팅 -> 20ms 정도
//  @GetMapping("/api/room/test/{type}/{roomId}")
//  @ResponseBody
//  public ResponseEntity test() {
//    ChatRoomDto chatRoomDto = new ChatRoomDto(1L, "session");
//    for (int i = 0 ; i < 100; i++) {
//      ChatDto chatDto = new ChatDto();
//      chatDto.setText("test" + i);
//      chatDto.setNickname("test" + i);
//      chatService2.saveChat(chatRoomDto, chatDto);
//      chatService2.saveChat(chatRoomDto, chatDto);
//    }
//    return ResponseEntity.ok().build();
//  }

//  // Total Count 날라가는 쿼리
//  @GetMapping("/api/v2/room/{type}/{roomId}")
//  @ResponseBody
//  public Page<ChatDto> getChatListByPage(@PathVariable String type, @PathVariable Long roomId,
//                                         @RequestParam Map<String, String> page) {
//    ChatService chatService = chatServiceFactory.getChatService(type);
//    return chatService.getChatListByPage(roomId, page);
//  }
//
//  // 무한 스크롤 할때 쓰는 쿼리
//  @GetMapping("/api/v3/room/{type}/{roomId}")
//  @ResponseBody
//  public Slice<ChatDto> getChatListBySlice(@PathVariable String type, @PathVariable Long roomId,
//                                           @RequestParam Map<String, String> page) {
//    ChatService chatService = chatServiceFactory.getChatService(type);
//    return chatService.getChatListBySlice(roomId, page);
//  }
}
