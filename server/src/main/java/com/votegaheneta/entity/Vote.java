package com.votegaheneta.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;

@Getter
@Entity
@Table(name = "vote")
public class Vote {

  @Id
  @GeneratedValue
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "session_id")
  private ElectionSession electionSession;

  @OneToMany(mappedBy = "vote")
  private List<VoteInfo> voteInfos;

  @OneToMany(mappedBy = "vote")
  private List<VoteTeam> voteTeams;

  private String voteName;

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
    electionSession.getVotes().add(this);
  }

  public void setVoteName(String voteName) {
    this.voteName = voteName;
  }
}