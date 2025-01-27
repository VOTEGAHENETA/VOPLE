package com.votegaheneta.vote.entity;

import com.votegaheneta.chat.entity.TeamChatRoom;
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
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

  @OneToMany(mappedBy = "voteTeam", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Pledge> pledges = new ArrayList<>();

  @OneToMany(mappedBy = "voteTeam")
  private List<Candidate> candidates = new ArrayList<>();

  @OneToOne(mappedBy = "voteTeam", cascade = CascadeType.ALL, orphanRemoval = true)
  private TeamChatRoom teamChatRoom;

  @OneToOne(mappedBy = "voteTeam", cascade = CascadeType.ALL, orphanRemoval = true)
  private Stream stream;

  private int pollCnt;
  private File poster;
  private String prefix;
  private String candidateStatement;

  @Builder
  public VoteTeam(TeamChatRoom teamChatRoom, Stream stream, File poster, String prefix,
      String candidateStatement) {
    this.setTeamChatRoom(teamChatRoom);
    this.setStream(stream);
    this.poster = poster;
    this.prefix = prefix;
    this.candidateStatement = candidateStatement;
  }

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

  public void setTeamChatRoom(TeamChatRoom teamChatRoom) {
    this.teamChatRoom = teamChatRoom;
    teamChatRoom.setVoteTeam(this);
  }

  public void setStream(Stream stream) {
    this.stream = stream;
    stream.setVoteTeam(this);
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