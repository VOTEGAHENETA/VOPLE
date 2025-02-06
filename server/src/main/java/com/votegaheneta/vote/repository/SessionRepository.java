package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.entity.ElectionSession;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SessionRepository extends JpaRepository<ElectionSession, Long> {

  List<ElectionSession> findByHostUser_Id(Long userId);

  @Query("select es.qrCode from ElectionSession es where es.id = :sessionId")
  String findQrcodeById(@Param("sessionId") Long sessionId);
}