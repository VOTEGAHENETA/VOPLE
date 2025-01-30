package com.votegaheneta.vote.entity;

import com.votegaheneta.chat.entity.SessionChatRoom;
import com.votegaheneta.user.entity.Users;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "election_session")
@NoArgsConstructor
public class ElectionSession {

  @Id @GeneratedValue
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "host_id")
  private Users hostUser;

  @OneToMany(mappedBy = "electionSession", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Vote> votes;

  @OneToOne(mappedBy = "electionSession", cascade = CascadeType.ALL, orphanRemoval = true)
  private SessionChatRoom sessionChatRoom;

  @Builder
  public ElectionSession(Users hostUser, String sessionName,
      int wholeVoter, String entranceQuestion, String entranceAnswer, LocalDateTime voteStartTime,
      LocalDateTime voteEndTime) {
    this.setHostUser(hostUser);
    this.sessionName = sessionName;
    this.wholeVoter = wholeVoter;
    this.entranceQuestion = entranceQuestion;
    this.entranceAnswer = entranceAnswer;
    this.voteStartTime = voteStartTime;
    this.voteEndTime = voteEndTime;
  }

//  private File qrCode;
  private String sessionName;
  private int wholeVoter;
  private int votedVoter;
  private String entranceQuestion;
  private String entranceAnswer;
  private LocalDateTime sessionStartTime = LocalDateTime.now();
  private LocalDateTime voteStartTime;
  private LocalDateTime voteEndTime;
  private boolean isActive;

  public void addVote(Vote vote) {
    votes.add(vote);
    vote.setElectionSession(this);
  }

  public void setSessionChatRoom(SessionChatRoom sessionChatRoom) {
    this.sessionChatRoom = sessionChatRoom;
    sessionChatRoom.setElectionSession(this);
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setHostUser(Users hostUser) {
    this.hostUser = hostUser;
    hostUser.getElectionSessions().add(this);
  }
//  public void setQrCode(File qrCode) {
//    this.qrCode = qrCode;
//  }

  public void setSessionName(String sessionName) {
    this.sessionName = sessionName;
  }

  public void setWholeVoter(int wholeVoter) {
    this.wholeVoter = wholeVoter;
  }

  public void incrementVotedVoter() {
    this.votedVoter++;
  }

  public void setEntracneQuestion(String entranceQuestion) {
    this.entranceQuestion = entranceQuestion;
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