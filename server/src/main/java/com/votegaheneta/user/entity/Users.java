package com.votegaheneta.user.entity;

import com.votegaheneta.user.dto.UserDto;
import com.votegaheneta.vote.entity.Candidate;
import com.votegaheneta.vote.entity.ElectionSession;
import com.votegaheneta.vote.entity.VoteInfo;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Users {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToMany(mappedBy = "hostUser", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<ElectionSession> electionSessions = new ArrayList<>();

  @OneToMany(mappedBy = "user")
  private List<VoteInfo> voteInfos = new ArrayList<>();

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Candidate> candidates = new ArrayList<>();

  private String username;
  private String nickname;

  @Builder
  public Users(String username, String nickname) {
    this.username = username;
    this.nickname = nickname;
  }

  public UserDto toDto() {
    return new UserDto(this);
  }

  public void addCandidate(Candidate candidate) {
    candidates.add(candidate);
    candidate.setUser(this);
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public void setNickname(String nickname) {
    this.nickname = nickname;
  }

  public void updateUser(UserDto userDto) {
    this.username = userDto.getUsername();
    this.nickname = userDto.getNickname();
  }
}
