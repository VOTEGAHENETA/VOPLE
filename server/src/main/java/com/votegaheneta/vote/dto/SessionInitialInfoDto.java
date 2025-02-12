package com.votegaheneta.vote.dto;

import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SessionInitialInfoDto {
  private Long sessionId;
  private String sessionName;
  private LocalDateTime startTime;
  private LocalDateTime endTime;
  private List<VoteResult> voteResults;
  private Float wholeVoterPercent;
}
