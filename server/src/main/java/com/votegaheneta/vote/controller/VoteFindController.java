package com.votegaheneta.vote.controller;

import com.votegaheneta.common.response.ApiResponse;
import com.votegaheneta.vote.dto.SessionFinalResultFindDto;
import com.votegaheneta.vote.dto.SessionFindDto;
import com.votegaheneta.vote.dto.SessionResultFindDto;
import com.votegaheneta.vote.service.VoteFindService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/vote")
public class VoteFindController {

  private final VoteFindService voteFindService;

  @GetMapping("/{sessionId}/detail")
  public ApiResponse<SessionFindDto> findVoteBySessionId(@PathVariable(name = "sessionId") Long sessionId) {
    SessionFindDto sessionFindDto = voteFindService.findVoteBySessionId(sessionId);
    return ApiResponse.success(HttpStatus.OK, "투표 상세화면 조회 성공", sessionFindDto);
  }

  @GetMapping("/{sessionId}/result/current")
  public ApiResponse<SessionResultFindDto> findVoteResultBySessionId(@PathVariable(name = "sessionId") Long sessionId) {
    SessionResultFindDto sessionResultFindDto = voteFindService.findVoteResultBySessionId(sessionId);
    return ApiResponse.success(HttpStatus.OK, "투표 결과 조회 성공", sessionResultFindDto);
  }

  @GetMapping("/{sessionId}/result/final")
  public ApiResponse<SessionFinalResultFindDto> findVoteFinalResultBySessionId(@PathVariable(name = "sessionId") Long sessionId) {
    SessionFinalResultFindDto sessionFinalResultFindDto = voteFindService.findVoteFinalResultBySessionId(sessionId);
    return ApiResponse.success(HttpStatus.OK, "최종 투표 결과 조회 성공", sessionFinalResultFindDto);
  }

}
