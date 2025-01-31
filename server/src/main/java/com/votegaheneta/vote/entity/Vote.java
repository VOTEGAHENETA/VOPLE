package com.votegaheneta.vote.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "vote")
public class Vote {

  @Id
  @GeneratedValue
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "session_id")
  private ElectionSession electionSession;

  @OneToMany(mappedBy = "vote")
  private List<VoteInfo> voteInfos = new ArrayList<>();

  @OneToMany(mappedBy = "vote", cascade = CascadeType.ALL, orphanRemoval = true)
  @BatchSize(size = 100)
  private List<VoteTeam> voteTeams = new ArrayList<>();

  private String voteName;

  public Vote(String voteName) {
    this.voteName = voteName;
  }

  public void addVoteTeam(VoteTeam voteTeam) {
    voteTeams.add(voteTeam);
    voteTeam.setVote(this);
  }

  public boolean isStarted() {
    return electionSession.getVoteStartTime().isBefore(LocalDateTime.now());
  }

  public boolean isEnded() {
    return electionSession.getVoteEndTime().isAfter(LocalDateTime.now());
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setElectionSession(ElectionSession electionSession) {
    this.electionSession = electionSession;
  }

  public void setVoteName(String voteName) {
    this.voteName = voteName;
  }
}