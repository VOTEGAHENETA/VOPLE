package com.votegaheneta.util;

import com.votegaheneta.security.oauth2.CustomOauth2User;
import com.votegaheneta.user.entity.Users;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

public class AuthenticationUtil {

  public static Users getUserFromOauth2Token(OAuth2AuthenticationToken token) {
    CustomOauth2User customOauth2User = (CustomOauth2User) token.getPrincipal();
    return customOauth2User.getUser();
  }

  public static Users getUserFromAuthentication() {
    Authentication authentication = SecurityContextHolder.getContextHolderStrategy().getContext()
        .getAuthentication();
    Users user = getUserFromOauth2Token((OAuth2AuthenticationToken) authentication);
    return user;
  }
}
