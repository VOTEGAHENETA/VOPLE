package com.votegaheneta.security.authorization;

import com.votegaheneta.user.entity.Users;
import com.votegaheneta.util.AuthenticationUtil;
import com.votegaheneta.vote.repository.ElectionRepository;
import com.votegaheneta.vote.repository.SessionUserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component("sessionAuth")
@RequiredArgsConstructor
public class SessionAuthorization {

  private final ElectionRepository electionRepository;
  private final SessionUserInfoRepository sessionUserInfoRepository;

  public boolean isAdminInSession(Long sessionId) {
    Users user = AuthenticationUtil.getUserFromAuthentication();
    return electionRepository.existsByIdAndHostUser(sessionId, user);
  }

  public boolean isUserInSession(Long sessionId) {
    Users user = AuthenticationUtil.getUserFromAuthentication();
    return sessionUserInfoRepository.existsByElectionSessionIdAndUser(sessionId, user);
  }
}
