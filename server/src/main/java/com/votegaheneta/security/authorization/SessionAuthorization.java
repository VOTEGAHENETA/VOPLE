package com.votegaheneta.security.authorization;

import com.votegaheneta.user.entity.Users;
import com.votegaheneta.util.AuthenticationUtil;
import com.votegaheneta.vote.repository.ElectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component("sessionAuth")
@RequiredArgsConstructor
public class SessionAuthorization {

  private final ElectionRepository electionRepository;

  public boolean isAdminInSession(Long sessionId) {
    Users user = AuthenticationUtil.getUserFromAuthentication();
    return electionRepository.existsByIdAndHostUser(sessionId, user);
  }
}
