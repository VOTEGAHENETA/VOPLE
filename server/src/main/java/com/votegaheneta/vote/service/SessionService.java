package com.votegaheneta.vote.service;

import com.votegaheneta.user.enums.USER_TYPE;
import com.votegaheneta.vote.controller.response.SessionResponse;
import com.votegaheneta.vote.dto.SessionDto;
import com.votegaheneta.vote.dto.SessionEditDto;
import com.votegaheneta.vote.dto.SessionInitialInfoDto;

public interface SessionService {

  USER_TYPE judgeUserType(Long sessionId, Long userId);

  SessionDto getSessionById(Long sessionId);

  SessionInitialInfoDto getSession(Long sessionId);

  SessionResponse getSessions(Long userId);

  Long saveSession(SessionDto sessionDto) throws RuntimeException;

  void updateSession(Long sessionId, SessionDto sessionDto);

  boolean deleteSession(Long Id);

  String getQrcode(Long sessionId);

  SessionEditDto getSessionEdit(Long sessionId);
}
