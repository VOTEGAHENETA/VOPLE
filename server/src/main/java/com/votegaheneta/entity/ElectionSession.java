package com.votegaheneta.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "election_session")
public class ElectionSession {

  @Id @GeneratedValue
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "host_id")
  private Users hostUser;

  @OneToMany(mappedBy = "electionSession")
  private List<Vote> votes;

  private File qrCode;
  private String sessionName;
  private int wholeVoter;
  private int votedVoter;
  private String entraceQuestion;
  private String entranceAnswer;
  private LocalDateTime sessionStartTime;
  private LocalDateTime voteStartTime;
  private LocalDateTime voteEndTime;
}