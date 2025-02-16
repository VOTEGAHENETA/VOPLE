package com.votegaheneta.util;

import com.votegaheneta.common.exception.EmptyOauthUserException;
import com.votegaheneta.security.oauth2.CustomOauth2User;
import com.votegaheneta.user.entity.Users;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

public class AuthenticationUtil {

  public static Users getUserFromOauth2Token(OAuth2AuthenticationToken token) throws EmptyOauthUserException {
    CustomOauth2User principal = (CustomOauth2User) token.getPrincipal();
    if (principal == null) {
      return null;
    }
    return principal.getUser().orElseThrow(EmptyOauthUserException::new);
  }

  public static Users getUserFromOauth2User(CustomOauth2User oauth2User) throws EmptyOauthUserException {
    return oauth2User.getUser().orElseThrow(EmptyOauthUserException::new);
  }

  public static Users getUserFromAuthentication() throws EmptyOauthUserException {
    Authentication authentication = SecurityContextHolder.getContextHolderStrategy().getContext()
        .getAuthentication();
    if (authentication == null) {
      return null;
    }
    CustomOauth2User oauth2User = (CustomOauth2User) authentication.getPrincipal();
    return getUserFromOauth2User(oauth2User);
  }
}
