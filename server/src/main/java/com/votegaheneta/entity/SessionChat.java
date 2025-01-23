package com.votegaheneta.entity;

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

@Getter
@Entity
@Table(name = "session_chat")
public class SessionChat {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "session_chat_room_id")
  private SessionChatRoom sessionChatRoom;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private Users user;

  private String text;
  private LocalTime createdTime = LocalTime.now();

  public void setId(Long id) {
    this.id = id;
  }

  public void setSessionChatRoom(SessionChatRoom sessionChatRoom) {
    this.sessionChatRoom = sessionChatRoom;
    sessionChatRoom.getSessionChats().add(this);
  }

  public void setText(String text) {
    this.text = text;
  }
}