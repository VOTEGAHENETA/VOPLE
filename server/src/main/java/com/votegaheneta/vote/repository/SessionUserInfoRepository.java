package com.votegaheneta.vote.repository;

import com.votegaheneta.user.entity.Users;
import com.votegaheneta.vote.entity.SessionUserInfo;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SessionUserInfoRepository extends JpaRepository<SessionUserInfo, Long> {

  boolean existsSessionUserInfoByElectionSessionIdAndUserId(Long sessionId, Long userId);

  @Query("SELECT sui FROM SessionUserInfo sui join fetch sui.user WHERE sui.electionSession.id = :sessionId")
  List<SessionUserInfo> findSessionUserInfosByElectionSessionId(Long sessionId);

  Optional<SessionUserInfo> findByElectionSessionIdAndUser(Long sessionId, Users user);

  boolean existsByElectionSessionIdAndUser(Long sessionId, Users user);

  @Query("select sui from SessionUserInfo sui where sui.electionSession.id = :sessionId and sui.user.id = :userId")
  Optional<SessionUserInfo> findBySessionIdAndUserId(@Param("sessionId") Long sessionId,@Param("userId") Long userId);
}