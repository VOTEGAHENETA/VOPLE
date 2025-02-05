package com.votegaheneta.vote.service;

import com.votegaheneta.vote.controller.response.SessionResponse;
import com.votegaheneta.vote.dto.SessionDto;
import com.votegaheneta.vote.dto.SessionInitialInfoDto;

public interface SessionService {
  SessionInitialInfoDto getSession(Long sessionId);
  SessionResponse getSessions(Long userId);
  Long saveSession(SessionDto sessionDto) throws RuntimeException;
  void updateSession(Long sessionId, SessionDto sessionDto);
  boolean deleteSession(Long Id);
}
