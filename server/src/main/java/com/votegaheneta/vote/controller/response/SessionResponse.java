package com.votegaheneta.vote.controller.response;


import com.votegaheneta.vote.dto.SessionDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SessionResponse {
  private List<SessionDto> involvedSessions;
  private List<SessionDto> managedSessions;
}
