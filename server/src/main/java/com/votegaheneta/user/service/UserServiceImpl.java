package com.votegaheneta.user.service;

import com.votegaheneta.user.dto.UserDto;
import com.votegaheneta.user.entity.Users;
import com.votegaheneta.user.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

  private final UsersRepository userRepository;

  @Override
  public UserDto getUser(Long userId) {
    Users user = userRepository.getUsersById(userId);
    return new UserDto(user);
  }

  @Transactional
  @Override
  public UserDto updateUser(Long userId, UserDto userDto) {
    Users user = userRepository.getUsersById(userId);
    System.out.println(userDto.getUserId());
    System.out.println(userDto.getUsername());
    user.updateUser(userDto);
    System.out.println(user.getId());
    System.out.println(user.getUsername());
    System.out.println(user.getNickname());
    return new UserDto(
        user.getId(),
        user.getKakaoId(),
        user.getNickname(),
        user.getUsername()
    );
  }
}
