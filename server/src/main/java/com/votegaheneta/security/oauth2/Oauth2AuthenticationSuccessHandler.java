package com.votegaheneta.security.oauth2;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Component;

@Component
public class Oauth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  @Value("${kakao_login_url}")
  private String KAKAO_LOGIN_URL;


  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                      Authentication authentication)
      throws IOException, ServletException {
    String requestURI = request.getRequestURI();
    System.out.println("requestURI = " + requestURI);
    HttpSessionRequestCache requestCache = new HttpSessionRequestCache();
    SavedRequest savedRequest = requestCache.getRequest(request, response);
    if (savedRequest != null) {
      String redirectUrl = savedRequest.getRedirectUrl();
      String[] split = redirectUrl.split("/");
      response.sendRedirect(String.format("%s/elections/%s", KAKAO_LOGIN_URL, split[split.length - 1]));
      System.out.println("redirectUrl = " + redirectUrl);
      return;
    }

    response.sendRedirect(KAKAO_LOGIN_URL + "/elections/list");
  }
}
