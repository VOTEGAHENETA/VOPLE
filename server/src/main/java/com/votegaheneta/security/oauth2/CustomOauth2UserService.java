package com.votegaheneta.security.oauth2;

import com.votegaheneta.user.entity.Users;
import com.votegaheneta.user.repository.UsersRepository;
import com.votegaheneta.util.nickname.component.NicknameGenerator;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomOauth2UserService extends DefaultOAuth2UserService {

  private final UsersRepository usersRepository;

  @Transactional
  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    OAuth2User oAuth2User = super.loadUser(userRequest);

    Map<String, Object> attributes = oAuth2User.getAttributes();
    Map<String, String> properties = oAuth2User.getAttribute("properties");
    Long kakaoId = (Long) attributes.get("id");
    String username = properties.get("nickname");
    String nickname = NicknameGenerator.generateNickname();

    Optional<Users> user = usersRepository.findByKakaoId(kakaoId);
    if (user.isPresent()) {
      return new CustomOauth2User(oAuth2User, user.get());
    }
    Users newUser = Users.builder()
        .kakaoId(kakaoId)
        .username(username)
        .nickname(nickname)
        .build();
    usersRepository.save(newUser);

    return new CustomOauth2User(oAuth2User, newUser);
  }
}
