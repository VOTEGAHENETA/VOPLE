package com.votegaheneta.vote.controller.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;

@Schema(name = "voteCastRequest(투표하기요청데이터)", description = "투표를 했을 때 받을 데이터를 정의한 request객체")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@CrossOrigin("*")
public class VoteCastRequest {

  @NotEmpty
  private List<VoteSelection> voteSelections;

  @Getter
  @NoArgsConstructor
  @AllArgsConstructor
  public static class VoteSelection {

    @Schema(name = "voteId(투표번호)")
    @NotNull
    @Positive
    private Long voteId;
    @Schema(name = "voteTeamId(투표팀번호)")
    @NotNull
    @Positive
    private Long voteTeamId;
  }
}
