package com.votegaheneta.user.controller;

import com.votegaheneta.common.response.ApiResponse;
import com.votegaheneta.user.dto.UserDto;
import com.votegaheneta.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

  private final UserService userService;

  @GetMapping("/{userId}")
  public ApiResponse<UserDto> getUser(@PathVariable("userId") Long userId) {
    UserDto user = userService.getUser(userId);
    return ApiResponse.success(HttpStatus.OK, "유저 조회 성공", user);
  }

  @PutMapping("/{userId}")
  public ApiResponse<UserDto> updateUser(@PathVariable("userId") Long userId, UserDto userDto) {
    userService.updateUser(userId, userDto);
    return ApiResponse.success(HttpStatus.OK, "유저 수정 성공", null);
  }
}
