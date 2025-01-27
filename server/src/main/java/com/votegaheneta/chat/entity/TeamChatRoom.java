package com.votegaheneta.chat.entity;

import com.votegaheneta.vote.entity.VoteTeam;
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
@Table(name = "team_chating_room")
public class TeamChatRoom {
  @Id
  private Long id;

  @MapsId
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id")
  private VoteTeam voteTeam;

  @OneToMany(mappedBy = "teamChatRoom", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<TeamChat> teamChats = new ArrayList<>();

  public TeamChatRoom(VoteTeam voteTeam) {
    voteTeam.setTeamChatRoom(this);
    this.voteTeam = voteTeam;
  }

  public int getUserCnt() {
    return teamChats.size();
  }

  public void addTeamChat(TeamChat teamChat) {
    teamChats.add(teamChat);
  }
}