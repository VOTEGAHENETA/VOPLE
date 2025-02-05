package com.votegaheneta.vote.service;

import com.votegaheneta.vote.dto.SessionDto;
import com.votegaheneta.vote.dto.SessionInitialInfoDto;

public interface SessionService {
  SessionInitialInfoDto getSession(Long sessionId);
  Long saveSession(SessionDto sessionDto) throws RuntimeException;
  void updateSession(Long sessionId, SessionDto sessionDto);
  boolean deleteSession(Long Id);
}
