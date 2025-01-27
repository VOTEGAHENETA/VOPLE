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

  public static TeamChat createTeamChat(TeamChatRoom teamChatRoom,  Users user, String text) {
    TeamChat teamChat = new TeamChat(user, teamChatRoom, text);
    teamChatRoom.addTeamChat(teamChat);
    return teamChat;
  }
  private TeamChat(Users user, TeamChatRoom teamChatRoom, String text) {
    this.user = user;
    this.teamChatRoom = teamChatRoom;
    this.text = text;
    this.createdTime = LocalTime.now();
  }
}