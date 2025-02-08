package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.entity.ElectionSession;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SessionRepository extends JpaRepository<ElectionSession, Long> {

  @Query("SELECT s FROM ElectionSession s join fetch s.hostUser WHERE s.id = :sessionId")
  ElectionSession findSessionById(Long sessionId);

  @Query("SELECT s FROM ElectionSession s join fetch s.sessionUserInfos WHERE s.id = :sessionId")
  Optional<ElectionSession> findSessionWithUserInfosById(Long sessionId);

  @Query("select es from ElectionSession es join fetch es.hostUser hu where hu.id = :userId")
  List<ElectionSession> findByHostUser_Id(@Param("userId") Long userId);

  @Query("select es.qrCode from ElectionSession es where es.id = :sessionId")
  Optional<String> findQrcodeById(@Param("sessionId") Long sessionId);

  @Query("select es from ElectionSession es join fetch es.sessionUserInfos sui where sui.user.id = :userId")
  List<ElectionSession> findBySessionUserInfos_Id(@Param("userId") Long userId);
}