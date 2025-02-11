package com.votegaheneta.security.config;

import com.votegaheneta.security.oauth2.CustomOauth2UserService;
import com.votegaheneta.security.oauth2.Oauth2AuthenticationSuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  private final CustomOauth2UserService customOAuth2UserService;
  private final Oauth2AuthenticationSuccessHandler oauth2AuthenticationSuccessHandler;

  public SecurityConfig(CustomOauth2UserService customOAuth2UserService,
                        Oauth2AuthenticationSuccessHandler oauth2AuthenticationSuccessHandler) {
    this.customOAuth2UserService = customOAuth2UserService;
    this.oauth2AuthenticationSuccessHandler = oauth2AuthenticationSuccessHandler;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .cors(AbstractHttpConfigurer::disable)
        .csrf(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(auth -> auth
//            .requestMatchers("/login", "/logout", "/chat", "/api/**", "/ws/**", "/stream/**", "/hls/**").permitAll()
//            .anyRequest().authenticated()
                .anyRequest().permitAll()
        )
        .oauth2Login(oauth2 -> oauth2
            .loginPage("/api/login")
            .userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService))
//            .successHandler(oauth2AuthenticationSuccessHandler)
        );
    return http.build();
  }
}
