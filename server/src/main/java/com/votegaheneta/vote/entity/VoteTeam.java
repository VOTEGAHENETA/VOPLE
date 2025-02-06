package com.votegaheneta.vote.entity;

import com.votegaheneta.stream.entity.Stream;
import jakarta.persistence.CascadeType;
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
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "vote_team")
public class VoteTeam {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "vote_id")
  private Vote vote;

  @OneToMany(mappedBy = "voteTeam", orphanRemoval = true)
  @BatchSize(size = 100)
  private List<Pledge> pledges = new ArrayList<>();

  @OneToMany(mappedBy = "voteTeam")
  @BatchSize(size = 100)
  private List<Candidate> candidates = new ArrayList<>();

  @OneToOne(mappedBy = "voteTeam", cascade = CascadeType.ALL, orphanRemoval = true)
  private Stream stream;

  private int pollCnt;
  private String poster;
  private String prefix;
  private String candidateStatement;

  public void setId(Long id) {
    this.id = id;
  }

  public void setVote(Vote vote) {
    this.vote = vote;
  }

  public void addPledge(Pledge pledge) {
    pledges.add(pledge);
    pledge.setVoteTeam(this);
  }

  public void addCandidate(Candidate candidate) {
    candidates.add(candidate);
    candidate.setVoteTeam(this);
  }

  public void setStream(Stream stream) {
    this.stream = stream;
    stream.setVoteTeam(this);
  }

  public void incrementPollCnt() {
    this.pollCnt++;
  }

  public void setPoster(String poster) {
    this.poster = poster;
  }

  public void setPrefix(String prefix) {
    this.prefix = prefix;
  }

  public void setCandidateStatement(String candidateStatement) {
    this.candidateStatement = candidateStatement;
  }
}