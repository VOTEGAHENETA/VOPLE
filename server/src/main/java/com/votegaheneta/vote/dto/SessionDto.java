package com.votegaheneta.vote.dto;

import com.votegaheneta.user.entity.Users;
import com.votegaheneta.vote.entity.ElectionSession;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionDto {

  private Long id;
  private Long hostId;
  private String sessionName;
  private String entranceQuestion;
  private String entranceAnswer;
  private LocalDateTime startTime;
  private LocalDateTime endTime;
  private int wholeVoter;

  public ElectionSession toEntity(Users user) {
    return new ElectionSession(user, sessionName, wholeVoter, entranceQuestion, entranceAnswer, startTime,
        endTime);
  }

  public void updateEntity(ElectionSession electionSession) {
    electionSession.setSessionName(sessionName);
    electionSession.setEntracneQuestion(entranceQuestion);
    electionSession.setEntranceAnswer(entranceAnswer);
    electionSession.setVoteStartTime(startTime);
    electionSession.setVoteEndTime(endTime);
    electionSession.setWholeVoter(wholeVoter);
  }

  public static SessionDto fromEntity(ElectionSession electionSession) {
    return new SessionDto(electionSession.getId(), electionSession.getHostUser().getId(), electionSession.getSessionName(),
        electionSession.getEntranceQuestion(), electionSession.getEntranceAnswer(), electionSession.getVoteStartTime(),
        electionSession.getVoteEndTime(), electionSession.getWholeVoter());
  }
}
