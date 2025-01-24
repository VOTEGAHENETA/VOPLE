package com.votegaheneta.chat.entity;

import com.votegaheneta.vote.entity.VoteTeam;
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
@Table(name = "team_chating_room")
public class TeamChatRoom {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "vote_team_id")
  private VoteTeam voteTeam;

  @OneToMany(mappedBy = "teamChatRoom", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<TeamChat> teamChats = new ArrayList<>();

  public int getUserCnt() {
    return teamChats.size();
  }

  public void addTeamChat(TeamChat teamChat) {
    teamChats.add(teamChat);
    teamChat.setTeamChatingRoom(this);
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setVoteTeam(VoteTeam voteTeam) {
    this.voteTeam = voteTeam;
  }
}