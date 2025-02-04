package com.votegaheneta.vote.service;

import com.votegaheneta.vote.dto.SessionDto;

public interface SessionService {
  SessionDto getSession(Long sessionId);
  Long saveSession(SessionDto sessionDto) throws RuntimeException;
  void updateSession(Long sessionId, SessionDto sessionDto);
  boolean deleteSession(Long Id);
}
