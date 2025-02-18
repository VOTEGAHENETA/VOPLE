package com.votegaheneta.chat.component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.nimbusds.jose.shaded.gson.JsonObject;
import com.votegaheneta.security.oauth2.CustomOauth2User;
import com.votegaheneta.user.entity.Users;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

  private final SimpMessagingTemplate simpleMessagingTemplate;
  private ConcurrentHashMap<Users, String> sessionChatRoomMap = new ConcurrentHashMap<>();
  private ConcurrentHashMap<String, AtomicLong> roomParticipantsCount = new ConcurrentHashMap<>();

  private final String DESTINATION_PREFIX = "/api";
  private final String ROOM_PREFIX = "/room";
  private final String VOTE_PREFIX = "/vote";

  @EventListener
  public void onSubscribe(SessionConnectEvent event) throws JsonProcessingException {
    StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
    String destination = headerAccessor.getDestination();
    OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) headerAccessor.getUser();
    CustomOauth2User oauth2User = (CustomOauth2User) token.getPrincipal();
    Optional<Users> optUser = oauth2User.getUser();

    if (destination != null && optUser.isPresent()) {
      String destinationPostFix = destination.substring(DESTINATION_PREFIX.length());

      if (destinationPostFix.startsWith(ROOM_PREFIX)) {
        String roomKey = destination.substring(ROOM_PREFIX.length());
//        sendEntranceMessage(token, destination);

        sessionChatRoomMap.put(optUser.get(), roomKey);
        long participantCount = roomParticipantsCount.computeIfAbsent(roomKey, key -> new AtomicLong(0)).incrementAndGet();
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("participantCount", participantCount);
        simpleMessagingTemplate.convertAndSend(destination, jsonObject.toString());
      }
    }
  }

  @EventListener
  public void onDisconnect(SessionDisconnectEvent event) {
    StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
    OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) headerAccessor.getUser();
    CustomOauth2User oauth2User = (CustomOauth2User) token.getPrincipal();
    Optional<Users> optUser = oauth2User.getUser();

    if (optUser.isPresent()) {
      String roomKey = sessionChatRoomMap.get(optUser.get());

      if (roomKey == null)
        return;

      sessionChatRoomMap.remove(optUser.get());
      long participantCount = roomParticipantsCount.computeIfAbsent(roomKey, key -> new AtomicLong(0)).decrementAndGet();
      participantCount = Math.max(participantCount, 0);
      JsonObject jsonObject = new JsonObject();
      jsonObject.addProperty("participantCount", participantCount);
      simpleMessagingTemplate.convertAndSend(DESTINATION_PREFIX + "/" + roomKey, jsonObject.toString());
    }
  }

//  private void sendEntranceMessage(OAuth2AuthenticationToken token, String destination)
//      throws JsonProcessingException {
//    if (token != null) {
//      Users user = AuthenticationUtil.getUserFromOauth2Token(token);
//      System.out.println("Received a new subscription to " + destination);
//      // /api/room/session/1
//      if (destination != null && user != null) {
//        JsonObject jsonObject = new JsonObject();
//        jsonObject.addProperty("nickname", user.getNickname());
//        simpleMessagingTemplate.convertAndSend(destination, jsonObject.toString());
//      }
//    }
//  }
}
