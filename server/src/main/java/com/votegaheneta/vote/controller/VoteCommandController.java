package com.votegaheneta.vote.controller;

import com.votegaheneta.common.exception.EmptyOauthUserException;
import com.votegaheneta.common.response.ApiResponse;
import com.votegaheneta.security.handler.AuthorizationExceptionHandler;
import com.votegaheneta.security.oauth2.CustomOauth2User;
import com.votegaheneta.user.entity.Users;
import com.votegaheneta.vote.controller.request.CandidateRequestDto;
import com.votegaheneta.vote.controller.request.VoteCastRequest;
import com.votegaheneta.vote.dto.SessionFindDto.VoteFindDto;
import com.votegaheneta.vote.service.VoteCommandService;
import com.votegaheneta.vote.service.VoteFindService;
import com.votegaheneta.vote.service.VoteTeamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authorization.method.HandleAuthorizationDenied;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/vote/{sessionId}")
@RequiredArgsConstructor
@Tag(name = "vote-command-controller", description = "vote-command-controller API")
public class VoteCommandController {

  private final VoteFindService voteFindService;
  private final VoteCommandService voteCommandService;
  private final VoteTeamService voteTeamService;
  private final SimpMessagingTemplate messagingTemplate;

  @Operation(
      summary = "투표팀 정보 수정",
      description = "FIGMA : 관리자 플로우 - [입후보자 조회/수정 화면]",
      requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
          description = "새로운 투표팀 후보자 정보",
          required = true,
          content = @Content(mediaType = "application/json", schema = @Schema(implementation = CandidateRequestDto.class),
              examples = {
                  @ExampleObject(
                      name = "요청 데이터",
                      value = """
                          
                            {
                                "voteTeamList" :
                                [
                                    [
                                        {"userId" : 1}
                                    ],
                                    [
                                        {"userId" : 4}
                                    ],
                                    [
                                        {"userId" : 5}
                                    ]
                                ]
                            }
                          """

                  )
              }))
  )
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true, in = ParameterIn.PATH),
      @Parameter(name = "voteId", description = "투표id", required = true, in = ParameterIn.PATH)
  })
  @PostMapping("/{voteId}")
  @PreAuthorize("@sessionAuth.isAdminInSession(#sessionId)")
  @HandleAuthorizationDenied(handlerClass = AuthorizationExceptionHandler.class)
  public ApiResponse modifyVoteTeam(@PathVariable("sessionId") Long sessionId, @PathVariable("voteId") Long voteId, @RequestBody
      CandidateRequestDto candidateRequest) {
    voteTeamService.modifyVoteTeam(sessionId, voteId, candidateRequest);
    return ApiResponse.success(HttpStatus.OK, "투표팀 수정 성공", null);
  }

  @Operation(
      summary = "투표 생성",
      description = "FIGMA : 관리자 플로우 - [선거 상세 페이지(학생 권한 설정 전)]",
      requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
          description = "생성할 투표 정보",
          required = true,
          content = @Content(mediaType = "application/json", schema = @Schema(implementation = VoteFindDto.class),
              examples = {
                  @ExampleObject(
                      name = "요청 데이터",
                      value = """
                          {
                               "voteName": "회장"
                           }
                          """

                  )
              }))
  )
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true, in = ParameterIn.PATH)
  })
  @PreAuthorize("@sessionAuth.isAdminInSession(#sessionId)")
  @HandleAuthorizationDenied(handlerClass = AuthorizationExceptionHandler.class)
  @PostMapping
  public ApiResponse<Void> createVote(@PathVariable("sessionId") Long sessionId, @RequestBody
      VoteFindDto voteFindDto) {
    voteCommandService.createVote(sessionId, voteFindDto.getVoteName());
    return ApiResponse.success(HttpStatus.CREATED, "투표 생성 성공", null);
  }

  @Operation(
      summary = "투표 삭제",
      description = "FIGMA : 관리자 플로우 - [선거 상세 페이지(학생 권한 설정 전)]"
  )
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true, in = ParameterIn.PATH),
      @Parameter(name = "voteId", description = "투표id", required = true, in = ParameterIn.PATH)
  })
  @PreAuthorize("@sessionAuth.isAdminInSession(#sessionId)")
  @HandleAuthorizationDenied(handlerClass = AuthorizationExceptionHandler.class)
  @DeleteMapping("/{voteId}")
  public ApiResponse<Void> deleteVote(@PathVariable("sessionId") Long sessionId, @PathVariable("voteId") Long voteId) {
    voteCommandService.deleteVote(sessionId, voteId);
    return ApiResponse.success(HttpStatus.NO_CONTENT, "투표 삭제 성공", null);
  }

  // 실제 투표 진행 -> 투표 버튼을 누르는거
  // WebSocket 사용해서 다른사람들 투표에도 반영되도록 해야할듯
  @Operation(
      summary = "투표 진행",
      description = "투표를 진행하고 투표 진행결과를 WebSocket으로 돌려주는 API"
  )
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true, in = ParameterIn.PATH)
  })
  @PreAuthorize("@sessionAuth.isUserInSession(#sessionId)")
  @HandleAuthorizationDenied(handlerClass = AuthorizationExceptionHandler.class)
  @PostMapping("/castvote")
  public ApiResponse<Void> castVote(
      @Positive @PathVariable("sessionId") Long sessionId,
      @Valid @RequestBody VoteCastRequest voteCastRequest,
      @AuthenticationPrincipal CustomOauth2User oauth2User) {
    Users user = oauth2User.getUser().orElseThrow(EmptyOauthUserException::new);
    voteCommandService.castVote(voteCastRequest, sessionId, user.getId());
    messagingTemplate.convertAndSend("/api/vote/"+sessionId
        , voteFindService.findVoteResultBySessionId(sessionId));
    return ApiResponse.success(HttpStatus.OK, "투표 성공", null);
  }
}
