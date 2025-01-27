package com.votegaheneta.chat.entity;

import com.votegaheneta.user.entity.Users;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalTime;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "session_chat")
public class SessionChat {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Column(name = "id", nullable = false)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "session_chat_room_id")
  private SessionChatRoom sessionChatRoom;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private Users user;

  private String text;
  private LocalTime createdTime;

  public SessionChat(SessionChatRoom sessionChatRoom, Users user, String text) {
    this.sessionChatRoom = sessionChatRoom;
    this.user = user;
    this.text = text;
    this.createdTime = LocalTime.now();
  }

  public static SessionChat createSessionChat(SessionChatRoom sessionChatRoom, Users user, String text) {
    SessionChat sessionChat = new SessionChat(sessionChatRoom, user, text);
    sessionChatRoom.addSessionChat(sessionChat);
    return sessionChat;
  }

  public void setId(Long id) {
    this.id = id;
  }
}