package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.entity.ElectionSession;
import io.lettuce.core.dynamic.annotation.Param;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SessionRepository extends JpaRepository<ElectionSession, Long> {

  @Query("SELECT s FROM ElectionSession s join fetch s.hostUser WHERE s.id = :sessionId")
  ElectionSession findSessionById(Long sessionId);

  @Query("SELECT s FROM ElectionSession s join fetch s.sessionUserInfos WHERE s.id = :sessionId")
  Optional<ElectionSession> findSessionWithUserInfosById(Long sessionId);
  List<ElectionSession> findByHostUser_Id(Long userId);

  @Query("select es.qrCode from ElectionSession es where es.id = :sessionId")
  String findQrcodeById(@Param("sessionId") Long sessionId);
}