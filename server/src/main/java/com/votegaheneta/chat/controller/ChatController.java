package com.votegaheneta.chat.controller;

import com.votegaheneta.chat.dto.ChatDto;
import com.votegaheneta.chat.dto.ChatRoomDto;
import com.votegaheneta.chat.service.ChatService;
import com.votegaheneta.common.response.ApiResponse;
import com.votegaheneta.security.handler.AuthorizationExceptionHandler;
import com.votegaheneta.user.dto.UserDto;
import com.votegaheneta.user.entity.Users;
import com.votegaheneta.user.repository.UsersRepository;
import com.votegaheneta.util.AuthenticationUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authorization.method.HandleAuthorizationDenied;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
public class ChatController {

  private final ChatService chatService;
  private final UsersRepository usersRepository;

  @MessageMapping("/{type}/{roomId}")
  @SendTo("/api/room/{type}/{roomId}")
  public ChatDto SessionChat(@DestinationVariable String type,
                             @DestinationVariable Long roomId,
                             @AuthenticationPrincipal OAuth2AuthenticationToken token,
                             ChatDto chatDto) {
    Users user = AuthenticationUtil.getUserFromOauth2Token(token);
    UserDto userDto = user.toDto();
    chatDto.setUserInfo(userDto);
    chatService.saveChat(new ChatRoomDto(roomId, type), chatDto);
    return chatDto;
  }

  // Paging 없이 전체 채팅 내용을 가져오는 쿼리
  @Operation(summary = "채팅 목록 조회", description = "채팅 목록을 조회합니다.")
  @Parameters({
      @Parameter(name = "type", description = "채팅방 타입 : session or team", example = "session"),
      @Parameter(name = "roomId", description = "채팅방 ID", example = "1")
  })
  @PreAuthorize("@chatAuth.isUserAuthorizedInChat(#type, #roomId)")
  @HandleAuthorizationDenied(handlerClass = AuthorizationExceptionHandler.class)
  @GetMapping("/api/room/{type}/{roomId}")
  @ResponseBody
  public ApiResponse<List<ChatDto>> getChatList(
      @PathVariable String type, @PathVariable Long roomId) {
    List<ChatDto> chatList = chatService.getChatList(new ChatRoomDto(roomId, type));
    if (chatList.isEmpty())
      return ApiResponse.success(HttpStatus.NO_CONTENT, "채팅 목록이 없습니다.", chatList);
    else
      return ApiResponse.success(HttpStatus.OK, "채팅 목록 조회 성공", chatService.getChatList(new ChatRoomDto(roomId, type)));
  }
}
