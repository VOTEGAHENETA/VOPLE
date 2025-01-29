package com.votegaheneta.vote.controller;

import com.votegaheneta.vote.dto.VoteFindDto;
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

  private final VoteFindService voteService;

  @GetMapping("/{voteId}/detail")
  public ResponseEntity<VoteFindDto> findVoteByVoteId(@PathVariable(name = "voteId") Long voteId) {
    VoteFindDto voteFindDto = voteService.findVoteByVoteId(voteId);
    return ResponseEntity.status(HttpStatus.ACCEPTED).body(voteFindDto);
  }
}
