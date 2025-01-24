package com.votegaheneta.chat.repository;

import com.votegaheneta.chat.entity.SessionChat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionChatRepository extends JpaRepository<SessionChat, Long> {

}