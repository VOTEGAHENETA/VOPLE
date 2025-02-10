package com.votegaheneta.security.oauth2;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class Oauth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
      FilterChain chain, Authentication authentication) throws IOException, ServletException {

    OAuth2User principal = (OAuth2User) authentication.getPrincipal();
    System.out.println("principal = " + principal);

    super.onAuthenticationSuccess(request, response, chain, authentication);
  }
}
