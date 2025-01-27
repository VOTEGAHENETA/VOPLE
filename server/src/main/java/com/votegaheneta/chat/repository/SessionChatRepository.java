package com.votegaheneta.chat.repository;

import com.votegaheneta.chat.entity.SessionChat;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.Query;

public interface SessionChatRepository extends BaseChatRepository<SessionChat, Long> {

  @Override
  @Query("SELECT sc FROM SessionChat sc join fetch sc.user WHERE sc.sessionChatRoom.id = :roomId order by sc.id desc")
  List<SessionChat> findChatsByRoomId(Long roomId);

  @Override
  @Query("SELECT sc FROM SessionChat sc join fetch sc.user WHERE sc.sessionChatRoom.id = :roomId")
  Page<SessionChat> findChatsPageByRoomId(Long roomId, Pageable pageable);

  @Override
  @Query("SELECT sc FROM SessionChat sc join fetch sc.user WHERE sc.sessionChatRoom.id = :roomId")
  Slice<SessionChat> findChatsSliceByRoomId(Long roomId, Pageable pageable);
}