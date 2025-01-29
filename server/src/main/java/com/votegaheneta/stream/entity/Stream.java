package com.votegaheneta.stream.entity;

import com.votegaheneta.vote.entity.VoteTeam;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "stream")
@NoArgsConstructor
public class Stream {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "vote_team_id")
  private VoteTeam voteTeam;

  private String streamingUrl;
  private boolean isStreaming;

  public Stream(String streamingUrl) {
    this.streamingUrl = streamingUrl;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setVoteTeam(VoteTeam voteTeam) {
    this.voteTeam = voteTeam;
  }

  public void setStreamingUrl(String streamingUrl) {
    this.streamingUrl = streamingUrl;
  }

  public void setStreaming(boolean streaming) {
    isStreaming = streaming;
  }
}