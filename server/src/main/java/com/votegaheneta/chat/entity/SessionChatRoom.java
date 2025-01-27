package com.votegaheneta.chat.entity;

import com.votegaheneta.vote.entity.ElectionSession;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "session_chat_room")
public class SessionChatRoom {

  @Id
  private Long id;

  @MapsId
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id")
  private ElectionSession electionSession;

  @OneToMany(mappedBy = "sessionChatRoom", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<SessionChat> sessionChats = new ArrayList<>();

  public SessionChatRoom(ElectionSession electionSession) {
    electionSession.setSessionChatRoom(this);
    this.electionSession = electionSession;
  }

  public int getUserCnt() {
    return sessionChats.size();
  }

  public void addSessionChat(SessionChat sessionChat) {
    sessionChats.add(sessionChat);
  }
}