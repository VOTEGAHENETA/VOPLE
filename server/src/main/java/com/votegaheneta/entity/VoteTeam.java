package com.votegaheneta.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.io.File;
import java.util.List;
import lombok.Getter;

@Getter
@Entity
@Table(name = "vote_team")
public class VoteTeam {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "vote_id")
  private Vote vote;

  @OneToMany(mappedBy = "voteTeam")
  private List<Pledge> pledges;

  @OneToMany(mappedBy = "voteTeam")
  private List<Candidate> candidates;

  @OneToOne(mappedBy = "voteTeam")
  private TeamChatRoom teamChatRoom;

  @OneToOne(mappedBy = "voteTeam")
  private Stream stream;

  private int pollCnt;
  private File poster;
  private String prefix;
  private String candidateStatement;

  public void setTeamChatingRoom(TeamChatRoom teamChatRoom) {
    this.teamChatRoom = teamChatRoom;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setVote(Vote vote) {
    this.vote = vote;
    vote.getVoteTeams().add(this);
  }

  public void setPollCnt(int pollCnt) {
    this.pollCnt = pollCnt;
  }

  public void setPoster(File poster) {
    this.poster = poster;
  }

  public void setPrefix(String prefix) {
    this.prefix = prefix;
  }

  public void setCandidateStatement(String candidateStatement) {
    this.candidateStatement = candidateStatement;
  }
}