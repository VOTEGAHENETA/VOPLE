package com.votegaheneta.vote.service;

import com.votegaheneta.vote.dto.SessionDto;
import com.votegaheneta.vote.dto.SessionInitialInfoDto;
import java.util.List;

public interface SessionService {
  List<SessionDto> getSessionList();
  SessionDto getSessionById(Long sessionId);
  SessionInitialInfoDto getSession(Long sessionId);
  Long saveSession(SessionDto sessionDto) throws RuntimeException;
  void updateSession(Long sessionId, SessionDto sessionDto);
  boolean deleteSession(Long Id);
}
