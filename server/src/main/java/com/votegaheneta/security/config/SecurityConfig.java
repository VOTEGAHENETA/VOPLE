package com.votegaheneta.security.config;

import com.votegaheneta.security.oauth2.CustomOauth2UserService;
import com.votegaheneta.security.oauth2.Oauth2AuthenticationSuccessHandler;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  private final CustomOauth2UserService customOAuth2UserService;
  private final Oauth2AuthenticationSuccessHandler oauth2AuthenticationSuccessHandler;

  @Value("${base_url}")
  private String BASE_URL;

  public SecurityConfig(CustomOauth2UserService customOAuth2UserService,
                        Oauth2AuthenticationSuccessHandler oauth2AuthenticationSuccessHandler) {
    this.customOAuth2UserService = customOAuth2UserService;
    this.oauth2AuthenticationSuccessHandler = oauth2AuthenticationSuccessHandler;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .csrf(AbstractHttpConfigurer::disable)
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
        .authorizeHttpRequests(auth -> auth
                                   .requestMatchers("/login").permitAll()
           .anyRequest().permitAll()
//                                   .requestMatchers("/api/login", "/api/logout").permitAll()
                                  //  .anyRequest().authenticated()
        )
        .oauth2Login(oauth2 -> oauth2
                         .loginPage(BASE_URL + "/login")
                         .userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService))
//                         .defaultSuccessUrl(BASE_URL)
                         .successHandler(oauth2AuthenticationSuccessHandler)
                         .failureUrl(BASE_URL + "/login?error=true")
        );
    return http.build();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "https://i12b102.p.ssafy.io")); // 프론트엔드 도메인
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}
