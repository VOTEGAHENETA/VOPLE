package com.votegaheneta.user.repository;

import static java.util.concurrent.TimeUnit.SECONDS;

import com.votegaheneta.user.dto.UserDto;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@RequiredArgsConstructor
public class RedisUserRepositoryImpl implements RedisUserRepository {

  private final RedisTemplate<String, UserDto> redisTemplate;

  private static final int EXPIRATION_TIME = 30;

  @Transactional
  @Override
  public void saveUser(String key, UserDto user) {
    redisTemplate.opsForValue().set(key, user);
    this.setExpire(key, EXPIRATION_TIME);
  }

  @Override
  public void setExpire(String key, long timeout) {
    redisTemplate.expire(key, timeout, SECONDS);
  }

  @Override
  public Optional<UserDto> getUser(String key) {
    return Optional.ofNullable(redisTemplate.opsForValue().get(key));
  }

}
