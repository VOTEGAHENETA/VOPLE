package com.votegaheneta.security.config;

import com.votegaheneta.security.oauth2.CustomOauth2UserService;
import com.votegaheneta.security.oauth2.Oauth2AuthenticationSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Autowired
  private CustomOauth2UserService customOAuth2UserService;

  @Autowired
  private Oauth2AuthenticationSuccessHandler oauth2AuthenticationSuccessHandler;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .cors(AbstractHttpConfigurer::disable)
        .csrf(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/static/**", "/images/**", "/css/**", "/js/**", "/login", "/logout").permitAll()
//            .anyRequest().authenticated()
            .anyRequest().permitAll()
        );
//        .oauth2Login(oauth2 -> oauth2
//            .loginPage("/login")
//            .userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService))
//            .successHandler(oauth2AuthenticationSuccessHandler)
////            .defaultSuccessUrl("/", true)
//        );
    return http.build();
  }

}
