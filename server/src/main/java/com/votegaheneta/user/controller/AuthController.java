package com.votegaheneta.user.controller;

import com.votegaheneta.common.response.ApiResponse;
import com.votegaheneta.security.oauth2.CustomOauth2User;
import io.swagger.v3.oas.annotations.Operation;
import java.util.Map;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Operation(
      summary = "로그인 여부 확인 API",
      description = """
          /login 페이지를 들어올때 로그인 된 사용자는 선거 리스트 화면으로 리다이렉트 되며 200 코드를 반환합니다.
          로그인 되지 않은 사용자는 로그인 페이지로 리다이렉트 되며 406 코드를 반환합니다.
          """
  )
  @GetMapping("/login")
  public ApiResponse<Map<String, Long>> login(
      @AuthenticationPrincipal CustomOauth2User oauth2User) {
    Optional<CustomOauth2User> user = Optional.ofNullable(oauth2User);
    return
        user.map(customOauth2User -> ApiResponse.success(HttpStatus.OK, "이미 로그인 된 유저입니다",
                                                         Map.of("userId",
                                                                customOauth2User.getUser().get()
                                                                    .getId())))
            .orElseGet(() -> ApiResponse.fail(HttpStatus.NOT_ACCEPTABLE, "로그인이 필요합니다"));
  }

}
