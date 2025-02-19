package com.votegaheneta.security.authorization;

import com.votegaheneta.user.entity.Users;
import com.votegaheneta.util.AuthenticationUtil;
import com.votegaheneta.vote.entity.ElectionSession;
import com.votegaheneta.vote.entity.SessionUserInfo;
import com.votegaheneta.vote.repository.ElectionRepository;
import com.votegaheneta.vote.repository.SessionUserInfoRepository;
import java.time.LocalDateTime;
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

  public boolean isSessionActive(Long sessionId) {
    ElectionSession electionSession = electionRepository.findById(sessionId).orElseThrow(() -> new IllegalArgumentException("메서드 보안에서 세션을 못찾음"));
    return electionSession.getVoteEndTime().isAfter(LocalDateTime.now());
  }

  public boolean hasUserVoted(Long sessionId) {
    Users user = AuthenticationUtil.getUserFromAuthentication();
    SessionUserInfo sui = sessionUserInfoRepository.findByElectionSessionIdAndUser(sessionId, user).orElseThrow(() -> new IllegalArgumentException("투표 여부 메서드 보안에서 세션을 못찾음"));
    return sui.isHasVoted();
  }

  public boolean authorizeCurrentVoteResult(Long sessionId) {
    return isSessionActive(sessionId) && (isAdminInSession(sessionId) || (isUserInSession(sessionId) && hasUserVoted(sessionId)));
  }

  public boolean authorizeFinalResult(Long sessionId) {
    return !isSessionActive(sessionId) && isUserInSession(sessionId);
  }
}
