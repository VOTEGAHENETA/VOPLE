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
@Table(name = "team_chat")
public class TeamChat {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private Users user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "chat_room_id")
  private TeamChatRoom teamChatRoom;

  private String text;
  private LocalTime createdTime;

  public void setId(Long id) {
    this.id = id;
  }

  public void setTeamChatingRoom(TeamChatRoom teamChatingRoom) {
    this.teamChatRoom = teamChatingRoom;
    teamChatingRoom.getTeamChats().add(this);
  }

  public void setText(String text) {
    this.text = text;
  }

  public void setCreatedTime(LocalTime createdTime) {
    this.createdTime = createdTime;
  }
}