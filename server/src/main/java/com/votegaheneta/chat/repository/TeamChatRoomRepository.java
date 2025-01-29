package com.votegaheneta.chat.repository;

import com.votegaheneta.chat.entity.TeamChatRoom;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamChatRoomRepository extends JpaRepository<TeamChatRoom, Long> {
  @EntityGraph(attributePaths = {"voteTeam"})
  Optional<TeamChatRoom> findById(Long id);
}