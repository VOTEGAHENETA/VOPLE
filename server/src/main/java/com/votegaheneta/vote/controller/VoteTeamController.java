package com.votegaheneta.vote.controller;

import com.votegaheneta.common.exception.EmptyOauthUserException;
import com.votegaheneta.common.response.ApiResponse;
import com.votegaheneta.security.handler.AuthorizationExceptionHandler;
import com.votegaheneta.security.oauth2.CustomOauth2User;
import com.votegaheneta.user.entity.Users;
import com.votegaheneta.vote.controller.request.VoteTeamInfoRequest;
import com.votegaheneta.vote.controller.response.VoteTeamInfoResponse;
import com.votegaheneta.vote.dto.VoteTeamPledgeDto;
import com.votegaheneta.vote.service.VoteTeamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authorization.method.HandleAuthorizationDenied;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/candidate")
public class VoteTeamController {

  private final VoteTeamService voteTeamService;

  @Operation(
      summary = "후보자 정보 수정",
      description = "FIGMA : 후보자 플로우 - [후보자 - 내용변경]",
      requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
          description = "후보자의 정보 등록/수정",
          required = true,
          content = @Content(mediaType = "application/json", schema = @Schema(implementation = VoteTeamInfoRequest.class),
              examples = {
                  @ExampleObject(
                      name = "요청 데이터",
                      value = """
                          {
                            "user" :
                            {
                            	"userId" : 1,
                            	"username" : "수정된 유저"
                            },
                            "voteTeam" :
                            {
                            	"poster" : "수정 포스터",
                            	"prefix" : "수정 칭호",
                            	"candidateStatement" : "수정 한줄평"
                            },
                            "pledges" :
                            [
                            	{"content" : "1번 공약"},
                            	{"content" : "2번 공약"},
                            	{"content" : "3번 공약"}
                            ]
                          }
                          """
                  )
              }))
  )
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true, in = ParameterIn.PATH)
  })
  @PreAuthorize("@candidateAuth.isCandidateInSession(#sessionId)")
  @HandleAuthorizationDenied(handlerClass = AuthorizationExceptionHandler.class)
  @PostMapping(value = "/{sessionId}" ,consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
  public ApiResponse<Void> updateVoteTeam(
      @PathVariable("sessionId") Long sessionId,
      @RequestPart(name = "voteTeamInfoRequest") VoteTeamInfoRequest voteTeamInfoRequest,
      @RequestPart(name = "file", required = false) MultipartFile file) {
    try {
      voteTeamService.updateVoteTeamInfo(voteTeamInfoRequest, file);
      return ApiResponse.success(HttpStatus.OK, "투표팀 정보 수정 성공", null);
    } catch (Exception e) {
      throw new IllegalArgumentException("투표 팀 정보 수정 실패");
    }
  }

  @Operation(
      summary = "후보자 정보 조회",
      description = "FIGMA : 후보자 플로우 - [후보자 - 내용변경]")
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true, in = ParameterIn.PATH)
  })
  @PreAuthorize("@candidateAuth.isCandidateInSession(#sessionId)")
  @HandleAuthorizationDenied(handlerClass = AuthorizationExceptionHandler.class)
  @GetMapping(value = "/{sessionId}")
  public ApiResponse<VoteTeamInfoResponse> getVoteTeam(@PathVariable("sessionId") Long sessionId, @AuthenticationPrincipal
                                                       CustomOauth2User oauth2User) {
    Users user = oauth2User.getUser().orElseThrow(EmptyOauthUserException::new);
    VoteTeamInfoResponse voteTeamInfo = voteTeamService.getVoteTeamInfo(sessionId, user.getId());
    return ApiResponse.success(HttpStatus.OK, "투표팀 정보 조회 성공", voteTeamInfo);
  }

  @Operation(
    summary = "팀 포스터, 공약 조회"
  )
  @Parameters({
      @Parameter(name = "teamId", description = "팀id", required = true)
  })
  @GetMapping("/{teamId}/detail")
  public ApiResponse<VoteTeamPledgeDto> getVoteTeamDetail(@PathVariable("teamId") Long teamId) {
    return ApiResponse.success(HttpStatus.OK, "투표팀 공약, 포스터 조회 성공", voteTeamService.getVoteTeamInfoDetail(teamId));
  }
}
