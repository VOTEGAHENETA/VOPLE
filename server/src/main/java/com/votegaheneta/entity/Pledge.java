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
import lombok.Getter;

@Getter
@Entity
@Table(name = "pledge")
public class Pledge {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "vote_team_id")
  private VoteTeam voteTeam;

  private String content;

  public void setId(Long id) {
    this.id = id;
  }

  public void setVoteTeam(VoteTeam voteTeam) {
    this.voteTeam = voteTeam;
    voteTeam.getPledges().add(this);
  }

  public void setContent(String content) {
    this.content = content;
  }
}