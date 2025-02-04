package com.votegaheneta.vote.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionDto {

  private Long hostId;
  private String sessionName;
  private String entranceQuestion;
  private String entranceAnswer;
  private LocalDateTime startTime;
  private LocalDateTime endTime;
  private int wholeVoter;
}
