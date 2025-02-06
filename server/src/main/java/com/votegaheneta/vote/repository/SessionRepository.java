package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.entity.ElectionSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SessionRepository extends JpaRepository<ElectionSession, Long> {

  @Query("SELECT s FROM ElectionSession s join fetch s.hostUser WHERE s.id = :sessionId")
  ElectionSession findSessionById(Long sessionId);
}