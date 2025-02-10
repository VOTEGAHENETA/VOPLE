package com.votegaheneta.security.oauth2;

import com.votegaheneta.user.repository.UsersRepository;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOauth2UserService extends DefaultOAuth2UserService {

  private final UsersRepository usersRepository;

  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    OAuth2User oAuth2User = super.loadUser(userRequest);

    Map<String, Object> attributes = oAuth2User.getAttributes();

    Map<String, String> properties = oAuth2User.getAttribute("properties");
    String nickname = properties.get("nickname");
    System.out.println("nickname = " + nickname);

    for (Map.Entry<String, Object> entry : attributes.entrySet()) {
      System.out.println("key = " + entry.getKey() + ", value = " + entry.getValue());
    }

    return oAuth2User;
  }
}
