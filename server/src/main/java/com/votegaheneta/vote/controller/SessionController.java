package com.votegaheneta.vote.controller;

import com.votegaheneta.common.response.ApiResponse;
import com.votegaheneta.user.enums.USER_TYPE;
import com.votegaheneta.vote.controller.response.SessionResponse;
import com.votegaheneta.vote.dto.SessionDto;
import com.votegaheneta.vote.dto.SessionEditDto;
import com.votegaheneta.vote.dto.SessionInitialInfoDto;
import com.votegaheneta.vote.service.SessionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
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

  @GetMapping("/question/{sessionId}")
  public ApiResponse<Void> getQuestion(@PathVariable("sessionId") Long sessionId) {
    System.out.println("redirecting");
    return ApiResponse.success(HttpStatus.OK, "redirecting", null);
  }

  @Operation(
      summary = "정보 수정 버튼을 눌렀을때 유권자 / 후보자 판별",
      description = "FIGMA : 후보자 플로우 - [메인 페이지-후보자 등록 전]"
  )
  @GetMapping("/{sessionId}/{userId}")
  public ApiResponse<USER_TYPE> judgeUserType(@PathVariable("sessionId") Long sessionId,
      @PathVariable("userId") Long userId) {
    USER_TYPE userType = sessionService.judgeUserType(sessionId, userId);
    return ApiResponse.success(HttpStatus.OK, "사용자 권한 조회 성공", userType);
  }

  @Operation(
      summary = "세션 MAIN 화면 조회",
      description = "FIGMA : 관리자 플로우 - [선거 리스트 (관리자 화면)]"
  )
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true, in = ParameterIn.PATH)
  })
  @GetMapping("/{sessionId}")
  public ApiResponse<SessionInitialInfoDto> getSession(@PathVariable("sessionId") Long sessionId) {
    SessionInitialInfoDto result = sessionService.getSession(sessionId);
    return ApiResponse.success(HttpStatus.OK, "세션 조회 성공", result);
  }

  @Operation(
      summary = "세션 수정화면 조회",
      description = "FIGMA : 선거 상세 페이지 학생권한 설정 전"
  )
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true, in = ParameterIn.PATH)
  })
  @GetMapping("/{sessionId}/edit")
  public ApiResponse<SessionEditDto> getSessionForEdit(@PathVariable("sessionId") Long sessionId) {
    // 세션 dto + 내가 생성한 투표 리스트
    SessionEditDto result = sessionService.getSessionEdit(sessionId);
    return ApiResponse.success(HttpStatus.OK, "세션 수정화면 조회 성공", result);
  }

  @Operation(
      summary = "사용자가 참여중인 세션 리스트 조회",
      description = "FIGMA : 관리자 플로우 - [선거 리스트 (관리자 화면)]"
  )
  @GetMapping
  public ApiResponse<SessionResponse> getSessions() {
    Long userId = 1L;
    SessionResponse result = sessionService.getSessions(userId);
    if (result.getManagedSessions().isEmpty() && result.getInvolvedSessions().isEmpty()) {
      return ApiResponse.fail(HttpStatus.NO_CONTENT, "세션 목록이 없습니다.");
    }
    return ApiResponse.success(HttpStatus.OK, "세션 목록 조회 성공", result);
  }

  @Operation(
      summary = "새로운 세션 생성",
      description = "FIGMA : 관리자 플로우 - [선거 추가 페이지]",
      requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
          description = "생성할 세션 정보",
          required = true,
          content = @Content(mediaType = "application/json", schema = @Schema(implementation = SessionDto.class),
              examples = {
                  @ExampleObject(
                      name = "요청 데이터",
                      description = "임시데이터가 존재할때는 pk오류남",
                      value = """
                          {
                          "hostId": 1,
                          "sessionName": "Session 3",
                          "entranceQuestion": "Question 3",
                          "entranceAnswer": "Answer 2",
                                  "startTime": "2023-01-01T11:00:00",
                                  "endTime": "2023-01-01T12:00:00",
                                  "wholeVoter": 80
                          }
                          """

                  )
              }))
  )
  @PostMapping
  public ApiResponse<Long> createSession(@RequestBody SessionDto sessionDto) {
    Long result = sessionService.saveSession(sessionDto);
    return ApiResponse.success(HttpStatus.CREATED, "세션 생성 성공", result);
  }

  @Operation(
      summary = "특정 세션 수정",
      description = "FIGMA : 관리자 플로우 - [선거 상세 페이지 (선거정보 수정)]",
      requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
          description = "수정할 세션 정보",
          required = true,
          content = @Content(mediaType = "application/json", schema = @Schema(implementation = SessionDto.class),
              examples = {
                  @ExampleObject(
                      name = "요청 데이터",
                      value = """
                          {
                          "hostId": 1,
                          "sessionName": "Session 3",
                          "entranceQuestion": "Question 3",
                          "entranceAnswer": "Answer 2",
                                  "startTime": "2023-01-01T11:00:00",
                                  "endTime": "2023-01-01T12:00:00",
                                  "wholeVoter": 80
                          }
                          """

                  )
              }))
  )
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true, in = ParameterIn.PATH)
  })
  @PutMapping("/{sessionId}")
  public ApiResponse<SessionDto> updateSession(@PathVariable Long sessionId,
      @RequestBody SessionDto sessionDto) {
    sessionService.updateSession(sessionId, sessionDto);
    return ApiResponse.success(HttpStatus.NO_CONTENT, "세션 수정 성공", null);
  }

  @Operation(
      summary = "특정 세션 삭제",
      description = "FIGMA : 관리자 플로우 - [선거 상세 페이지(학생 권한 설정 전)]"
  )
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true, in = ParameterIn.PATH)
  })
  @DeleteMapping("/{sessionId}")
  public ApiResponse deleteSession(@PathVariable Long sessionId) {
    boolean result = sessionService.deleteSession(sessionId);
    return result ? ApiResponse.success(HttpStatus.NO_CONTENT, "세션 삭제 성공", null)
        : ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "세션 삭제 실패");
  }

  @Operation(
      summary = "QR코드 조회",
      description = "FIGMA : 관리자 플로우 - [학생 권한 설정전 QR코드 보기]"
  )
  @Parameters(
      @Parameter(name = "sessionId", description = "세션id", required = true)
  )
  @GetMapping("/{sessionId}/qrcode")
  public ApiResponse<String> getQrCode(@PathVariable("sessionId") Long sessionId) {
    return ApiResponse.success(HttpStatus.OK, "QR코드 조회 성공", sessionService.getQrcode(sessionId));
  }

}
