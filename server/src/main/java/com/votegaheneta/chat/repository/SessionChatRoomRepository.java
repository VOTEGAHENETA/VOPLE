package com.votegaheneta.chat.repository;

import com.votegaheneta.chat.entity.SessionChatRoom;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionChatRoomRepository extends JpaRepository<SessionChatRoom, Long> {

  @EntityGraph(attributePaths = {"electionSession"})
  Optional<SessionChatRoom> findById(Long id);
}