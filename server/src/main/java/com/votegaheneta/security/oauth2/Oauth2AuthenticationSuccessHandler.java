package com.votegaheneta.security.oauth2;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Component;

@Component
public class Oauth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  @Value("${base_url}")
  private String BASE_URL;


  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                      Authentication authentication)
      throws IOException, ServletException {
    OAuth2User principal = (OAuth2User) authentication.getPrincipal();
    System.out.println("principal = " + principal);

    Authentication auth = SecurityContextHolder.getContextHolderStrategy().getContext()
        .getAuthentication();

    if (auth != null) {
      System.out.println("auth.getName() = " + auth.getName());
    }

    String requestURI = request.getRequestURI();
    System.out.println("requestURI = " + requestURI);
    HttpSessionRequestCache requestCache = new HttpSessionRequestCache();
    SavedRequest savedRequest = requestCache.getRequest(request, response);
    if (savedRequest != null) {
      String redirectUrl = savedRequest.getRedirectUrl();
      System.out.println("redirectUrl = " + redirectUrl);
      response.sendRedirect(redirectUrl);
    }

    response.sendRedirect(BASE_URL);


    super.onAuthenticationSuccess(request, response, authentication);
  }
}
