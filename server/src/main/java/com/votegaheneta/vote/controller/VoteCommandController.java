package com.votegaheneta.vote.controller;

import com.votegaheneta.common.response.ApiResponse;
import com.votegaheneta.vote.controller.request.VoteCastRequest;
import com.votegaheneta.vote.service.VoteCommandService;
import com.votegaheneta.vote.service.VoteFindService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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

  private final VoteFindService voteFindServiceImpl;
  private final VoteCommandService voteCommandService;
  private final SimpMessagingTemplate messagingTemplate;

//  @Operation(
//      summary = "투표 생성",
//      description = "새로운 투표 생성"
//  )
//  @Parameters({
//      @Parameter(name = "sessionId", description = "세션id", required = true),
//      @Parameter(name = "voteName", description = "투표 이름", required = true)
//  })
//  @PostMapping
//  public ApiResponse<Void> createVote(@PathVariable("sessionId") Long sessionId, @RequestBody
//      VoteFindDto voteFindDto) {
//    voteCommandService.createVote(sessionId, voteFindDto.getVoteName());
//    return ApiResponse.success(HttpStatus.CREATED, "투표 생성 성공", null);
//  }
//  @Operation(
//      summary = "투표 삭제",
//      description = "특정 투표 ID의 투표 삭제"
//  )
//  @Parameters({
//      @Parameter(name = "sessionId", description = "세션id", required = true),
//      @Parameter(name = "voteId", description = "투표id", required = true)
//  })
//  @DeleteMapping("/{voteId}")
//  public ApiResponse<Void> deleteVote(@PathVariable("sessionId") Long sessionId, @PathVariable("voteId") Long voteId) {
//    voteCommandService.deleteVote(voteId);
//    return ApiResponse.success(HttpStatus.NO_CONTENT, "투표 삭제 성공", null);
//  }
//

  // 실제 투표 진행 -> 투표 버튼을 누르는거
  // WebSocket 사용해서 다른사람들 투표에도 반영되도록 해야할듯
  @Operation(
      summary = "투표 진행",
      description = "투표를 진행하고 투표 진행결과를 WebSocket으로 돌려주는 API"
  )
  @Parameters({
      @Parameter(name = "sessionId", description = "세션id", required = true)
  })
  @PostMapping("/castvote")
  public ApiResponse<Void> castVote(
      @Positive @PathVariable("sessionId") Long sessionId,
      @Valid @RequestBody VoteCastRequest voteCastRequest) {
    voteCommandService.castVote(voteCastRequest, sessionId);

    messagingTemplate.convertAndSend("/api/vote/"+sessionId
        , voteFindServiceImpl.findVoteResultBySessionId(sessionId));

    return ApiResponse.success(HttpStatus.OK, "투표 성공", null);
  }
}
