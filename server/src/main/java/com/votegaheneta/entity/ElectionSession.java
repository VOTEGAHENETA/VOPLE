package com.votegaheneta.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;

@Getter
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

  @OneToOne(mappedBy = "electionSession")
  private SessionChatRoom sessionChatRoom;

  private File qrCode;
  private String sessionName;
  private int wholeVoter;
  private int votedVoter;
  private String entraceQuestion;
  private String entranceAnswer;
  private LocalDateTime sessionStartTime;
  private LocalDateTime voteStartTime;
  private LocalDateTime voteEndTime;

  public void setSessionChatRoom(SessionChatRoom sessionChatRoom) {
    this.sessionChatRoom = sessionChatRoom;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setHostUser(Users hostUser) {
    this.hostUser = hostUser;
    hostUser.getElectionSessions().add(this);
  }
  public void setQrCode(File qrCode) {
    this.qrCode = qrCode;
  }

  public void setSessionName(String sessionName) {
    this.sessionName = sessionName;
  }

  public void setWholeVoter(int wholeVoter) {
    this.wholeVoter = wholeVoter;
  }

  public void setVotedVoter(int votedVoter) {
    this.votedVoter = votedVoter;
  }

  public void setEntraceQuestion(String entraceQuestion) {
    this.entraceQuestion = entraceQuestion;
  }

  public void setEntranceAnswer(String entranceAnswer) {
    this.entranceAnswer = entranceAnswer;
  }

  public void setSessionStartTime(LocalDateTime sessionStartTime) {
    this.sessionStartTime = sessionStartTime;
  }

  public void setVoteStartTime(LocalDateTime voteStartTime) {
    this.voteStartTime = voteStartTime;
  }

  public void setVoteEndTime(LocalDateTime voteEndTime) {
    this.voteEndTime = voteEndTime;
  }
}