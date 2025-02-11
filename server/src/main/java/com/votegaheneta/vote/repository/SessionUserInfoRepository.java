package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.entity.SessionUserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionUserInfoRepository extends JpaRepository<SessionUserInfo, Long> {

  boolean existsSessionUserInfoByElectionSessionIdAndUserId(Long sessionId, Long userId);
}