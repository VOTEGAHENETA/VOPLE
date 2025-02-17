package com.votegaheneta.vote.dto;

import com.votegaheneta.vote.entity.ElectionSession;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SessionListDto {
  private Long id;
  private String sessionName;
  private LocalDateTime startTime;
  private LocalDateTime endTime;
  private Boolean isClosed;

  public static SessionListDto from(ElectionSession electionSession, Boolean isClosed) {
    return new SessionListDto(
        electionSession.getId(),
        electionSession.getSessionName(),
        electionSession.getVoteStartTime(),
        electionSession.getVoteEndTime(),
        isClosed
    );
  }



}
