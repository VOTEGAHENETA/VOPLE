package com.votegaheneta.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class StaticResourceSecurityConfig {

  @Order(1)
  @Bean
  public SecurityFilterChain staticResourceSecurityFilterChain(HttpSecurity http) throws Exception {
    http
        .securityMatcher("/static/**", "/images/**", "/css/**", "/js/**", "/swagger-ui/**", "/v3/**")
        .authorizeHttpRequests(auth -> auth
            .anyRequest().permitAll()
        )
    ;

    return http.build();
  }

}
