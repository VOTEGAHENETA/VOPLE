package com.votegaheneta.user.repository;

import static java.util.concurrent.TimeUnit.SECONDS;

import com.votegaheneta.user.dto.UserDto;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RedisUserRepositoryImpl implements RedisUserRepository {

  private final RedisTemplate<String, UserDto> redisTemplate;

  @Override
  public void saveUser(String key, UserDto user) {
    redisTemplate.opsForValue().set(key, user);
    redisTemplate.expire(key, 10, SECONDS);
  }

  @Override
  public Optional<UserDto> getUser(String key) {
    return Optional.ofNullable(redisTemplate.opsForValue().get(key));
  }

}
