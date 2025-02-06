package com.votegaheneta.vote.controller;

import com.votegaheneta.common.response.ApiResponse;
import com.votegaheneta.vote.dto.SessionDto;
import com.votegaheneta.vote.dto.SessionInitialInfoDto;
import com.votegaheneta.vote.service.SessionService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/election")
public class SessionController {

  private final SessionService sessionService;

  @GetMapping
  public ApiResponse<List<SessionDto>> getSessionList() {
    List<SessionDto> result = sessionService.getSessionList();
    return ApiResponse.success(HttpStatus.OK, "세션 목록 조회 성공", result);
  }

  @GetMapping("/{sessionId}")
  public ApiResponse<SessionInitialInfoDto> getSession(@PathVariable("sessionId") Long sessionId) {
    SessionInitialInfoDto result = sessionService.getSession(sessionId);
    return ApiResponse.success(HttpStatus.OK, "세션 조회 성공", result);
  }

//  @GetMapping
//  public ApiResponse<Void> getSessions() {
//    // 내가 참여하고있는 세션 리스트
//    // 내가 관리하고있는 세션 리스트
//
//    return null;
//  }

  @PostMapping
  public ApiResponse<Long> createSession(@RequestBody SessionDto sessionDto) {
    Long result = sessionService.saveSession(sessionDto);
    return ApiResponse.success(HttpStatus.CREATED, "세션 생성 성공", result);
  }

  @PutMapping("/{sessionId}")
  public ApiResponse<SessionDto> updateSession(@PathVariable Long sessionId, @RequestBody SessionDto sessionDto) {
    sessionService.updateSession(sessionId, sessionDto);
    return ApiResponse.success(HttpStatus.NO_CONTENT, "세션 수정 성공", null);
  }

  @DeleteMapping("/{sessionId}")
  public ApiResponse deleteSession(@PathVariable Long sessionId) {
    boolean result = sessionService.deleteSession(sessionId);
    return result ? ApiResponse.success(HttpStatus.NO_CONTENT, "세션 삭제 성공", null)
        : ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "세션 삭제 실패");
  }
}
