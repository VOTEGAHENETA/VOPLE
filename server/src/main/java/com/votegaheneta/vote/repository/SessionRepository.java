package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.entity.ElectionSession;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<ElectionSession, Long> {

//  @Query("select es from ElectionSession es where es.hostUser.id = :userId")
//  List<SessionDto> findByHostId(@Param("userId") Long userId);

  List<ElectionSession> findByHostUser_Id(Long userId);
}