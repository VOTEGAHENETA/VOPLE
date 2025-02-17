package com.votegaheneta.security.authorization;

import com.votegaheneta.user.entity.Users;
import com.votegaheneta.user.enums.USER_TYPE;
import com.votegaheneta.util.AuthenticationUtil;
import com.votegaheneta.vote.entity.SessionUserInfo;
import com.votegaheneta.vote.repository.SessionUserInfoRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component("candidateAuth")
@RequiredArgsConstructor
public class CandidateAuthorization {

  private final SessionUserInfoRepository sessionUserInfoRepository;

  public boolean isCandidateInSession(Long sessionId) {
    Users user = AuthenticationUtil.getUserFromAuthentication();
    Optional<SessionUserInfo> sui = sessionUserInfoRepository.findBySessionIdAndUserId(sessionId, user.getId());
    return sui.map(SessionUserInfo::getUserType).filter(userType -> userType == USER_TYPE.CANDIDATE).isPresent();
  }
}
