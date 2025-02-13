package com.votegaheneta.user.controller;

import com.votegaheneta.common.response.ApiResponse;
import com.votegaheneta.user.dto.UserDto;
import com.votegaheneta.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

  private final UserService userService;

  @Operation(
      summary = "마이페이지에서 유저 정보 조회",
      description = "FIGMA : 투표자 플로우 - [이름 변경]"
  )
  @Parameters(
      @Parameter(name = "userId", description = "유저 id", required = true)
  )
  @GetMapping("/{userId}")
  public ApiResponse<UserDto> getUser(@PathVariable("userId") Long userId) {
    UserDto user = userService.getUser(userId);
    return ApiResponse.success(HttpStatus.OK, "유저 조회 성공", user);
  }

  @Operation(
      summary = "마이페이지에서 유저 정보 조회",
      description = "FIGMA : 투표자 플로우 - [이름 변경]",
      requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
          description = "사용자 이름 변경",
          required = true,
          content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserDto.class),
              examples = {
                  @ExampleObject(
                      name = "요청 데이터",
                      value = """
                          {
                            "userId": 1,
                            "kakaoId": 3915025342,
                            "nickname": "미끄러운 카멜레온",
                            "username": "최효재"
                          }
                          """

                  )
              }))
  )
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true, in = ParameterIn.PATH)
  })
  @PutMapping("/{userId}")
  public ApiResponse<UserDto> updateUser(@PathVariable("userId") Long userId,@RequestBody UserDto userDto) {
    System.out.println(userDto.getUserId());
    System.out.println(userDto.getUsername());
    UserDto result = userService.updateUser(userId, userDto);
    return ApiResponse.success(HttpStatus.OK, "유저 수정 성공", result);
  }

}
