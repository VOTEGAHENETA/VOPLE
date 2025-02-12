package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.entity.SessionUserInfo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SessionUserInfoRepository extends JpaRepository<SessionUserInfo, Long> {

  boolean existsSessionUserInfoByElectionSessionIdAndUserId(Long sessionId, Long userId);

  @Query("SELECT sui FROM SessionUserInfo sui join fetch sui.user WHERE sui.electionSession.id = :sessionId")
  List<SessionUserInfo> findSessionUserInfosByElectionSessionId(Long sessionId);
}