package com.votegaheneta.chat.repository;

import com.votegaheneta.chat.entity.SessionChatRoom;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;

public interface SessionChatRoomRepository extends BaseChatRoomRepository<SessionChatRoom, Long> {

  @Override
  @EntityGraph(attributePaths = {"electionSession"})
  Optional<SessionChatRoom> findById(Long id);
}