package com.votegaheneta.user.service;

import com.votegaheneta.user.dto.UserDto;
import org.springframework.stereotype.Service;

public interface UserService {

  UserDto getUser(Long userId);

  void updateUser(Long userId, UserDto userDto);
}
