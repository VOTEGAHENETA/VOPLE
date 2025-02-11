package com.votegaheneta.user.repository;

import com.votegaheneta.user.entity.Users;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {

  Users getUsersById(Long userId);

  boolean existsByKakaoId(Long kakaoId);

  Optional<Users> findByKakaoId(Long kakaoId);
}