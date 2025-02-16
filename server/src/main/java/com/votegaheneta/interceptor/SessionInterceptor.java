package com.votegaheneta.interceptor;

import com.votegaheneta.user.entity.Users;
import com.votegaheneta.util.AuthenticationUtil;
import com.votegaheneta.vote.repository.ElectionRepository;
import com.votegaheneta.vote.repository.SessionUserInfoRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class SessionInterceptor implements HandlerInterceptor {

  @Value("${base_url}")
  private String BASE_URL;
  private final String REDIRECT = "api/redirect";
  private final SessionUserInfoRepository sessionUserInfoRepository;
  private final ElectionRepository electionRepository;

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {
    String requestURI = request.getRequestURI();
    String[] splitUrl = requestURI.split("/");
    Long sessionId = Long.parseLong(splitUrl[splitUrl.length - 1]);

    // sessionId가 유효하지 않으면 false 반환
    boolean electionExisted = electionRepository.existsById(sessionId);
    if (!electionExisted) {
      throw new IllegalArgumentException("입력한 세션 ID는 존재하지 않습니다");
    }

    Users user = AuthenticationUtil.getUserFromAuthentication();
    System.out.println("user = " + user);

    boolean exist = sessionUserInfoRepository.existsSessionUserInfoByElectionSessionIdAndUserId(sessionId, user.getId());
    if (!exist) {
      String redirectURL = String.format("%s/%s/elections/%d/question", BASE_URL, REDIRECT,sessionId);
      response.sendRedirect(redirectURL);
      return false;
    }
    return true;
  }
}
