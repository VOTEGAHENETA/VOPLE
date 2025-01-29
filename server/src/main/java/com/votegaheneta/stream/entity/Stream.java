package com.votegaheneta.stream.entity;

import com.votegaheneta.vote.entity.VoteTeam;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "stream")
@NoArgsConstructor
public class Stream {

  @Id
  private Long id;

  @MapsId
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id")
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