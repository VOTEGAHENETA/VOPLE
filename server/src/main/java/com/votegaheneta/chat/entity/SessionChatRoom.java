package com.votegaheneta.chat.entity;

import com.votegaheneta.vote.entity.ElectionSession;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;

@Getter
@Entity
@Table(name = "session_chat_room")
public class SessionChatRoom {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "session_id")
  private ElectionSession electionSession;

  @OneToMany(mappedBy = "sessionChatRoom", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<SessionChat> sessionChats = new ArrayList<>();

  public int getUserCnt() {
    return sessionChats.size();
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void addSessionChat(SessionChat sessionChat) {
    sessionChats.add(sessionChat);
    sessionChat.setSessionChatRoom(this);
  }

  public void setElectionSession(ElectionSession electionSession) {
    this.electionSession = electionSession;
  }
}