package com.votegaheneta.chat.component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.nimbusds.jose.shaded.gson.JsonObject;
import com.votegaheneta.user.entity.Users;
import com.votegaheneta.util.AuthenticationUtil;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

  private final SimpMessagingTemplate simpleMessagingTemplate;
  private final ConcurrentHashMap<String, ConcurrentHashMap<String, Boolean>> roomParticipants = new ConcurrentHashMap<>();

  private final String DESTINATION_PREFIX = "/api";
  private final String ROOM_PREFIX = "/room";
  private final String VOTE_PREFIX = "/vote";

  @EventListener
  public void onSubscribe(SessionSubscribeEvent event) throws JsonProcessingException {
    StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
    String destination = headerAccessor.getDestination();
    OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) headerAccessor.getUser();
    String sessionId = headerAccessor.getSessionId();

    if (destination != null && sessionId != null) {
      String destinationPostFix = destination.substring(DESTINATION_PREFIX.length());

      if (destinationPostFix.startsWith(ROOM_PREFIX)) {
        String roomKey = destination.substring(ROOM_PREFIX.length());
        roomParticipants.computeIfAbsent(roomKey, key -> new ConcurrentHashMap<>()).put(sessionId, true);
        sendEntranceMessage(token, destination);
      }
    }
  }

  @EventListener
  public void onDisconnect(SessionUnsubscribeEvent event) {
    StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
//    OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) headerAccessor.getUser();

    String sessionId = headerAccessor.getSessionId();
    System.out.println("sessionId = " + sessionId);
    String destination = headerAccessor.getDestination();

  }

  private void sendEntranceMessage(OAuth2AuthenticationToken token, String destination)
      throws JsonProcessingException {
    if (token != null) {
      Users user = AuthenticationUtil.getUserFromOauth2Token(token);
      System.out.println("Received a new subscription to " + destination);
      // /api/room/session/1
      if (destination != null && user != null) {
        String message = String.format("<%s 님이 입장하였습니다>", user.getNickname());
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("nickname", user.getNickname());
        simpleMessagingTemplate.convertAndSend(destination, jsonObject.toString());
      }
    }
  }
}
