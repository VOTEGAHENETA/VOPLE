package com.votegaheneta.vote.dto;

import com.votegaheneta.vote.entity.ElectionSession;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SessionListDto {
  private Long id;
  private String sessionName;
  private LocalDate startTime;
  private LocalDate endTime;
  private Boolean isClosed;

  public static SessionListDto from(ElectionSession electionSession, Boolean isClosed) {
    return new SessionListDto(
        electionSession.getId(),
        electionSession.getSessionName(),
        electionSession.getVoteStartTime().toLocalDate(),
        electionSession.getVoteEndTime().toLocalDate(),
        isClosed
    );
  }



}
