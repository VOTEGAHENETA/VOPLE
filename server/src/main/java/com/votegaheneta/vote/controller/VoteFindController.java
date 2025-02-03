package com.votegaheneta.vote.controller;

import com.votegaheneta.vote.dto.SessionFindDto;
import com.votegaheneta.vote.dto.SessionResultFindDto;
import com.votegaheneta.vote.service.VoteFindService;
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
  public ResponseEntity<SessionFindDto> findVoteBySessionId(@PathVariable(name = "sessionId") Long sessionId) {
    SessionFindDto sessionFindDto = voteFindService.findVoteBySessionId(sessionId);
    return ResponseEntity.status(HttpStatus.OK).body(sessionFindDto);
  }

  @GetMapping("/{sessionId}/result/current")
  public ResponseEntity<SessionResultFindDto> findVoteResultBySessionId(@PathVariable(name = "sessionId") Long sessionId) {
    SessionResultFindDto sessionResultFindDto = voteFindService.findVoteResultBySessionId(sessionId);
    return ResponseEntity.status(HttpStatus.OK).body(sessionResultFindDto);
  }

//  @GetMapping("/{sessionId}/result/final")
//  public ResponseEntity<Void> findVoteFinalResultBySessionId(@PathVariable(name = 'sessionId') Long sessionId) {
//
//    return null;
//  }

}
