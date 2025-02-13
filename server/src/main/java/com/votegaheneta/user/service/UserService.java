package com.votegaheneta.user.service;

import com.votegaheneta.user.dto.UserDto;

public interface UserService {

  UserDto getUser(Long userId);

  UserDto updateUser(Long userId, UserDto userDto);
}
