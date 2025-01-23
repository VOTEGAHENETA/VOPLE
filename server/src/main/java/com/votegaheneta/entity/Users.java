package com.votegaheneta.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;
import lombok.Getter;

@Entity
@Getter
public class Users {

  @Id
  @GeneratedValue
  private Long id;

  @OneToMany(mappedBy = "hostUser")
  private List<ElectionSession> electionSessions;

  @OneToMany(mappedBy = "user")
  private List<VoteInfo> voteInfos;

  @OneToMany(mappedBy = "user")
  private List<Candidate> candidates;

  private String username;
  private String nickname;

  public void setId(Long id) {
    this.id = id;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public void setNickname(String nickname) {
    this.nickname = nickname;
  }
}
