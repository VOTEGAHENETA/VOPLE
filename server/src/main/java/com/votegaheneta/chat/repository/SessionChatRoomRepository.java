package com.votegaheneta.chat.repository;

import com.votegaheneta.chat.entity.SessionChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionChatRoomRepository extends JpaRepository<SessionChatRoom, Long> {

}