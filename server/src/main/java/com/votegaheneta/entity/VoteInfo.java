package com.votegaheneta.entity;

import com.votegaheneta.enums.USER_TYPE;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;

@Getter
@Entity
@Table(name = "vote_info")
public class VoteInfo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "vote_id")
  private Vote vote;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private Users user;

  private String selectCandidate;
  private boolean hasSelect;
  private USER_TYPE userType;

  public void setId(Long id) {
    this.id = id;
  }

  public void setVote(Vote vote) {
    this.vote = vote;
    vote.getVoteInfos().add(this);
  }

  public void setUser(Users user) {
    this.user = user;
    user.getVoteInfos().add(this);
  }

  public void setSelectCandidate(String selectCandidate) {
    this.selectCandidate = selectCandidate;
  }

  public void setHasSelect(boolean hasSelect) {
    this.hasSelect = hasSelect;
  }

  public void setUserType(USER_TYPE userType) {
    this.userType = userType;
  }
}