package com.votegaheneta.vote.entity;

import com.votegaheneta.user.entity.Users;
import com.votegaheneta.user.enums.USER_TYPE;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "session_user_info")
@NoArgsConstructor
public class SessionUserInfo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "session_id")
  private ElectionSession electionSession;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private Users user;

  @Column(columnDefinition = "boolean default false")
  private boolean hasVoted = false;

  @Enumerated(EnumType.STRING)
  @Column(columnDefinition = "varchar(255) default 'VOTER'")
  private USER_TYPE userType = USER_TYPE.VOTER;

  public SessionUserInfo(Users user, ElectionSession electionSession) {
    this.user = user;
    user.getSessionUserInfos().add(this);
    this.electionSession = electionSession;
    electionSession.getSessionUserInfos().add(this);
  }

  public void updateSessionInfoHasVoted(Boolean aTrue) {
    this.hasVoted = aTrue;
  }
}