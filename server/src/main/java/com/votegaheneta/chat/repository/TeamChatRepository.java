package com.votegaheneta.chat.repository;

import com.votegaheneta.chat.entity.TeamChat;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.Query;

public interface TeamChatRepository extends BaseChatRepository<TeamChat, Long> {
  @Override
  @Query("SELECT tc FROM TeamChat tc join fetch tc.user WHERE tc.teamChatRoom.id = :roomId order by tc.id desc")
  List<TeamChat> findChatsByRoomId(Long roomId);

  @Override
  @Query("SELECT tc FROM TeamChat tc join fetch tc.user WHERE tc.teamChatRoom.id = :roomId")
  Page<TeamChat> findChatsPageByRoomId(Long roomId, Pageable pageable);

  @Override
  @Query("SELECT tc FROM TeamChat tc join fetch tc.user WHERE tc.teamChatRoom.id = :roomId")
  Slice<TeamChat> findChatsSliceByRoomId(Long roomId, Pageable pageable);
}