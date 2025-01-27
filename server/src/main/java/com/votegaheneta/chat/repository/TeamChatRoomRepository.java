package com.votegaheneta.chat.repository;

import com.votegaheneta.chat.entity.TeamChatRoom;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;

public interface TeamChatRoomRepository extends BaseChatRoomRepository<TeamChatRoom, Long> {
  @Override
  @EntityGraph(attributePaths = {"voteTeam"})
  Optional<TeamChatRoom> findById(Long id);
}