package com.votegaheneta.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Users {

  @Id
  @GeneratedValue
  private Long id;

  @OneToMany(mappedBy = "hostUser")
  private List<ElectionSession> electionSessions;

  private String username;
  private String nickname;
}
