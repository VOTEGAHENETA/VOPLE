package com.votegaheneta.vote.service;

import com.votegaheneta.user.dto.UserDto;
import com.votegaheneta.user.enums.USER_TYPE;
import com.votegaheneta.vote.controller.response.SessionResponse;
import com.votegaheneta.vote.controller.response.SessionValidateResponse;
import com.votegaheneta.vote.dto.SessionDto;
import com.votegaheneta.vote.dto.SessionEditDto;
import com.votegaheneta.vote.dto.SessionInitialInfoDto;

public interface SessionService {

  USER_TYPE judgeUserType(Long sessionId, Long userId);

  SessionInitialInfoDto getSession(Long sessionId, Long userId);

  SessionResponse getSessions(Long userId);

  Long saveSession(SessionDto sessionDto, UserDto userDto) throws RuntimeException;

  void updateSession(Long sessionId, SessionDto sessionDto);

  boolean deleteSession(Long Id);

  String getQrcode(Long sessionId);

  SessionEditDto getSessionEdit(Long sessionId);

  SessionValidateResponse validateQuestion(Long sessionId, Long userId, String answer);

  String getQuestion(Long sessionId);
}
