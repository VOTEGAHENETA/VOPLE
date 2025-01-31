package com.votegaheneta.user.repository;

import com.votegaheneta.user.dto.UserDto;
import java.util.Optional;

public interface RedisUserRepository {

  void saveUser(String key, UserDto user);
  Optional<UserDto> getUser(String key);
}
