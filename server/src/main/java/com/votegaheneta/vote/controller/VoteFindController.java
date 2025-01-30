package com.votegaheneta.vote.controller;

import com.votegaheneta.vote.dto.SessionResultFindDto;
import com.votegaheneta.vote.dto.VoteFindDto;
import com.votegaheneta.vote.service.VoteFindService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
  public ResponseEntity<List<VoteFindDto>> findVoteBySessionId(@PathVariable(name = "sessionId") Long sessionId) {
    List<VoteFindDto> voteFindDtos = voteFindService.findVoteBySessionId(sessionId);
    return ResponseEntity.status(HttpStatus.ACCEPTED).body(voteFindDtos);
  }

  @GetMapping("/{sessionId}/result")
  public ResponseEntity<SessionResultFindDto> findVoteResultBySessionId(@PathVariable(name = "sessionId") Long sessionId) {
    SessionResultFindDto sessionResultFindDto = voteFindService.findVoteResultBySessionId(sessionId);
    return ResponseEntity.status(HttpStatus.ACCEPTED).body(sessionResultFindDto);
  }

  @GetMapping("/{sessionId}/result/final")
  public ResponseEntity<Void> findVoteFinalResultBySessionId() {}

}
