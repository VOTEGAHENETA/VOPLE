package com.votegaheneta.vote.controller;

import com.votegaheneta.vote.dto.request.VoteCastRequest;
import com.votegaheneta.vote.service.VoteCommandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
  @PostMapping("{voteId}/doVote")
  public ResponseEntity<Void> castVote(@RequestBody VoteCastRequest voteCastRequest) {
    // 이미 투표 진행한 사람은 조회를 먼저해서 있는지 확인해 봐야할듯
    voteCommandService.castVote(voteCastRequest);
    return ResponseEntity.status(HttpStatus.ACCEPTED).build();
  }

}
