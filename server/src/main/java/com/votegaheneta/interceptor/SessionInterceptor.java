package com.votegaheneta.interceptor;

import com.votegaheneta.user.entity.Users;
import com.votegaheneta.util.AuthenticationUtil;
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
  private final SessionUserInfoRepository sessionUserInfoRepository;

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {
    String requestURI = request.getRequestURI();
    System.out.println("requestURI = " + requestURI);
    String[] splitUrl = requestURI.split("/");
    Long sessionId = Long.parseLong(splitUrl[splitUrl.length - 1]);
    System.out.println("sessionId = " + sessionId);

    Users user = AuthenticationUtil.getUserFromAuthentication();
    System.out.println("user = " + user);

    boolean exist = sessionUserInfoRepository.existsSessionUserInfoByElectionSessionIdAndUserId(sessionId, user.getId());
    if (!exist) {
      String redirectURL = String.format("%s/elections/question/%d", BASE_URL, sessionId);
      response.sendRedirect(redirectURL);
      return false;
    }
    return true;
  }
}
