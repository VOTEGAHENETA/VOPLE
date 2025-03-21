package com.votegaheneta.vote.controller;

import com.votegaheneta.common.response.ApiResponse;
import com.votegaheneta.security.handler.AuthorizationExceptionHandler;
import com.votegaheneta.vote.dto.SessionFinalResultFindDto;
import com.votegaheneta.vote.dto.SessionFindDto;
import com.votegaheneta.vote.dto.SessionFindDto.VoteFindDto;
import com.votegaheneta.vote.dto.SessionResultFindDto;
import com.votegaheneta.vote.dto.VoteDetailDto;
import com.votegaheneta.vote.dto.VoteInfoDto;
import com.votegaheneta.vote.service.VoteFindService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authorization.method.HandleAuthorizationDenied;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/vote/{sessionId}")
public class VoteFindController {

  private final VoteFindService voteFindService;

  @Operation(
      summary = "투표 입후보자 페이지 정보 조회",
      description = "FIGMA : 관리자 플로우 - [입후보자 조회/수정 화면]")
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true, in = ParameterIn.PATH),
      @Parameter(name = "sessionId", description = "투표id", required = true, in = ParameterIn.PATH)
  })
  @PreAuthorize("@sessionAuth.isAdminInSession(#sessionId)")
  @HandleAuthorizationDenied(handlerClass = AuthorizationExceptionHandler.class)
  @GetMapping("/{voteId}")
  public ApiResponse<VoteDetailDto> getVoteDetail(@PathVariable("sessionId") Long sessionId,
                                                  @PathVariable("voteId") Long voteId,
                                                  Pageable pageable) {
    VoteDetailDto voteDetail = voteFindService.getVoteDetail(sessionId, voteId, pageable);
    return ApiResponse.success(HttpStatus.OK, "투표 상세 정보 조회 성공", voteDetail);
  }


  // ㄴ -> ㄴ이 들어간 모든 이름 조회
  @Operation(
      summary = "입후보자 지정화면에서 후보자 검색, 초성 검색 가능",
      description = "FIGMA : 관리자 플로우 - [입후보자 조회/수정 화면]")
  @Parameters({
      @Parameter(name = "voteId", description = "투표 id", required = true, in = ParameterIn.PATH)
  })
  @PreAuthorize("@sessionAuth.isAdminInSession(#sessionId)")
  @HandleAuthorizationDenied(handlerClass = AuthorizationExceptionHandler.class)
  @GetMapping("/{voteId}/search")
  public ApiResponse<List<VoteInfoDto>> searchVoteCandidate(
      @PathVariable("sessionId") Long sessionId,
      @PathVariable("voteId") Long voteId,
      @RequestParam("keyword") String keyword,
      Pageable pageable) {
    List<VoteInfoDto> result = voteFindService.findSearchCandidates(sessionId, voteId, keyword, pageable);
    return ApiResponse.success(HttpStatus.OK, "후보자 리스트 검색 성공", result);
  }

  @Operation(
      summary = "투표 리스트 조회",
      description = "FIGMA : 관리자 플로우 - [선거 상세 페이지(학생 권한 설정 전)]")
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true, in = ParameterIn.PATH)
  })
  @PreAuthorize("@sessionAuth.isAdminInSession(#sessionId)")
  @HandleAuthorizationDenied(handlerClass = AuthorizationExceptionHandler.class)
  @GetMapping
  public ApiResponse<List<VoteFindDto>> getVoteList(@PathVariable("sessionId") Long sessionId) {
    List<VoteFindDto> result = voteFindService.getVoteList(sessionId);
    return ApiResponse.success(HttpStatus.OK, "투표 목록 조회 성공", result);
  }

  @Operation(
      summary = "투표 상세화면 조회",
      description = "투표 상세화면의 팀 리스트를 반환해주는 API")
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true, in = ParameterIn.PATH)
  })
  @PreAuthorize("@sessionAuth.isUserInSession(#sessionId) && !@sessionAuth.hasUserVoted(#sessionId)")
  @HandleAuthorizationDenied(handlerClass = AuthorizationExceptionHandler.class)
  @GetMapping("/detail")
  public ApiResponse<SessionFindDto> findVoteBySessionId(
      @Valid @Positive @PathVariable(name = "sessionId") Long sessionId) {
    SessionFindDto sessionFindDto = voteFindService.findVoteBySessionId(sessionId);
    return ApiResponse.success(HttpStatus.OK, "투표 상세화면 조회 성공", sessionFindDto);
  }

  @Operation(
      summary = "투표 진행 결과화면 조회",
      description = "투표를 진행중일 때 결과화면 조회 API")
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true, in = ParameterIn.PATH)
  })
  @PreAuthorize("@sessionAuth.authorizeCurrentVoteResult(#sessionId)")
  @HandleAuthorizationDenied(handlerClass = AuthorizationExceptionHandler.class)
  @GetMapping("/result/current")
  public ApiResponse<SessionResultFindDto> findVoteResultBySessionId(
      @Valid @Positive @PathVariable(name = "sessionId") Long sessionId) {
    SessionResultFindDto sessionResultFindDto = voteFindService.findVoteResultBySessionId(
        sessionId);
    return ApiResponse.success(HttpStatus.OK, "투표 결과 조회 성공", sessionResultFindDto);
  }

  @Operation(
      summary = "투표가 끝난 후 결과화면 조회",
      description = "투표가 완전히 종료된 후 결과화면 조회 API"
  )
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true, in = ParameterIn.PATH)
  })
  @PreAuthorize("@sessionAuth.authorizeFinalResult(#sessionId)")
  @GetMapping("/result/final")
  public ApiResponse<SessionFinalResultFindDto> findVoteFinalResultBySessionId(
      @Valid @Positive @PathVariable(name = "sessionId") Long sessionId) {
    SessionFinalResultFindDto sessionFinalResultFindDto = voteFindService.findVoteFinalResultBySessionId(
        sessionId);
    return ApiResponse.success(HttpStatus.OK, "최종 투표 결과 조회 성공", sessionFinalResultFindDto);
  }
}
