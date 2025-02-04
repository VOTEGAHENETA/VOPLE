package com.votegaheneta.vote.service;

import com.votegaheneta.vote.dto.SessionDto;

public interface SessionService {
  boolean saveSession(SessionDto sessionDto);
  SessionDto getSession(Long sessionId);
  boolean deleteSession(SessionDto sessionDto);
}
