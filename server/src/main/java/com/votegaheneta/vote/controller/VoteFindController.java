package com.votegaheneta.vote.controller;

import com.votegaheneta.common.response.ApiResponse;
import com.votegaheneta.vote.dto.SessionFinalResultFindDto;
import com.votegaheneta.vote.dto.SessionFindDto;
import com.votegaheneta.vote.dto.SessionResultFindDto;
import com.votegaheneta.vote.service.VoteFindService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/vote")
@Tag(name = "vote-find-controller", description = "vote-find-controller API")
public class VoteFindController {

  private final VoteFindService voteFindServiceImpl;

  @Operation(
      summary = "투표 상세화면 조회",
      description = "투표 상세화면의 팀 리스트를 반환해주는 API")
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true)
  })
  @GetMapping("/{sessionId}/detail")
  public ApiResponse<SessionFindDto> findVoteBySessionId(
      @Valid @Positive @PathVariable(name = "sessionId") Long sessionId) {
    SessionFindDto sessionFindDto = voteFindServiceImpl.findVoteBySessionId(sessionId);
    return ApiResponse.success(HttpStatus.OK, "투표 상세화면 조회 성공", sessionFindDto);
  }

  @Operation(
      summary = "투표 진행 결과화면 조회",
      description = "투표를 진행중일 때 결과화면 조회 API")
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true)
  })
  @GetMapping("/{sessionId}/result/current")
  public ApiResponse<SessionResultFindDto> findVoteResultBySessionId(
      @Valid @Positive @PathVariable(name = "sessionId") Long sessionId) {
    SessionResultFindDto sessionResultFindDto = voteFindServiceImpl.findVoteResultBySessionId(
        sessionId);
    return ApiResponse.success(HttpStatus.OK, "투표 결과 조회 성공", sessionResultFindDto);
  }

  @Operation(
      summary = "투표가 끝난 후 결과화면 조회",
      description = "투표가 완전히 종료된 후 결과화면 조회 API"
  )
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true)
  })
  @GetMapping("/{sessionId}/result/final")
  public ApiResponse<SessionFinalResultFindDto> findVoteFinalResultBySessionId(
      @Valid @Positive @PathVariable(name = "sessionId") Long sessionId) {
    SessionFinalResultFindDto sessionFinalResultFindDto = voteFindServiceImpl.findVoteFinalResultBySessionId(
        sessionId);
    return ApiResponse.success(HttpStatus.OK, "최종 투표 결과 조회 성공", sessionFinalResultFindDto);
  }

  @Operation(
      summary = "회원의 투표 완료 여부 조회",
      description = "특정 회원이 특정 투표에 대해서 투표 진행을 했는지 여부를 반환"
  )
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true)
  })
  @GetMapping("/{sessionId}/{userId}/hasVoted")
  public ApiResponse<Boolean> hasVoted(
      @Valid @Positive @PathVariable(name = "sessionId") Long sessionId,
      @Valid @Positive @PathVariable(name = "userId") Long userId) {
    return ApiResponse.success(HttpStatus.OK, "투표 완료 여부 확인",
        voteFindServiceImpl.hasVoted(sessionId, userId));
  }
}
