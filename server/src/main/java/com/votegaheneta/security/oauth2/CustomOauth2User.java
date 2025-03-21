package com.votegaheneta.security.oauth2;

import com.votegaheneta.common.exception.EmptyOauthUserException;
import com.votegaheneta.user.entity.Users;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Getter
public class CustomOauth2User implements OAuth2User {

  private final OAuth2User oauth2User;
  private final Optional<Users> user;

  public CustomOauth2User(OAuth2User oauth2User, Users user) {
    this.oauth2User = oauth2User;
    this.user = Optional.of(user);
  }

  @Override
  public <A> A getAttribute(String name) {
    return OAuth2User.super.getAttribute(name);
  }

  @Override
  public Map<String, Object> getAttributes() {
    return oauth2User.getAttributes();
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return oauth2User.getAuthorities();
  }

  @Override
  public String getName() {
    return user.orElseThrow(EmptyOauthUserException::new).getUsername();
  }
}
