package com.votegaheneta.vote.service;

import com.votegaheneta.user.entity.Users;
import com.votegaheneta.user.repository.UsersRepository;
import com.votegaheneta.vote.dto.SessionDto;
import com.votegaheneta.vote.entity.ElectionSession;
import com.votegaheneta.vote.repository.SessionRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SessionServiceImpl implements SessionService {

  private final SessionRepository sessionRepository;
  private final UsersRepository usersRepository;

  @Override
  public Long saveSession(SessionDto sessionDto) {
    Users user = usersRepository.findById(sessionDto.getHostId())
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
    ElectionSession electionSession = sessionDto.toEntity(user);
    electionSession = sessionRepository.save(electionSession);
    return electionSession.getId();
  }

  @Override
  public SessionDto getSession(Long sessionId) {
    ElectionSession electionSession = sessionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 세션입니다."));
    return SessionDto.fromEntity(electionSession);
  }

  @Override
  public List<SessionDto> getSessionList() {
    List<ElectionSession> sessionList = sessionRepository.findAll();
    return sessionList.stream().map(SessionDto::fromEntity).toList();
  }

  @Transactional
  @Override
  public void updateSession(Long sessionId, SessionDto sessionDto) {
    ElectionSession electionSession = sessionRepository.findById(sessionId)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 세션입니다."));
    sessionDto.updateEntity(electionSession);
  }

  @Override
  public boolean deleteSession(Long sessionId) {
    try {
      sessionRepository.deleteById(sessionId);
    } catch (RuntimeException e) {
      return false;
    }
    return true;
  }
}
