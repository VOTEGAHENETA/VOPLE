package com.votegaheneta.vote.service;

import com.votegaheneta.vote.dto.SessionDto;
import java.util.List;

public interface SessionService {
  List<SessionDto> getSessionList();
  SessionDto getSession(Long sessionId);
  Long saveSession(SessionDto sessionDto) throws RuntimeException;
  void updateSession(Long sessionId, SessionDto sessionDto);
  boolean deleteSession(Long Id);
}
