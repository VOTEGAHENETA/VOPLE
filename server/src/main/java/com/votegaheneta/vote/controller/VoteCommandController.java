package com.votegaheneta.vote.controller;

import com.votegaheneta.common.response.ApiResponse;
import com.votegaheneta.vote.controller.request.VoteCastRequest;
import com.votegaheneta.vote.service.VoteCommandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/vote")
@RequiredArgsConstructor
public class VoteCommandController {

  private final VoteCommandService voteCommandService;

  // 실제 투표 진행 -> 투표 버튼을 누르는거
  // WebSocket 사용해서 다른사람들 투표에도 반영되도록 해야할듯
  @PostMapping("{voteId}/castvote")
  public ApiResponse<Void> castVote(@RequestBody VoteCastRequest voteCastRequest) {
    voteCommandService.castVote(voteCastRequest);
    return ApiResponse.success(HttpStatus.OK, "투표 성공", null);
  }
}
