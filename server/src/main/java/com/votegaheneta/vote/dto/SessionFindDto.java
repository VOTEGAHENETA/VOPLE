package com.votegaheneta.vote.dto;

import com.votegaheneta.vote.entity.Candidate;
import com.votegaheneta.vote.entity.Vote;
import com.votegaheneta.vote.entity.VoteTeam;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Schema(name = "SessionFindDto(선거 세션 객체)")
@Getter
@RequiredArgsConstructor
public class SessionFindDto {

  private final Long sessionId;
  private final String sessionName;
  @Schema(name = "voteFindDto", description = "투표하기를 통해 투표 들어갔을 때 출력할 화면 dto 객체 리스트")
  private final List<VoteFindDto> voteFindDtos;

  @Getter
  @AllArgsConstructor
  @NoArgsConstructor
  public static class VoteFindDto {

    private Long voteId;
    private String voteName;
    private List<VoteTeamFindDto> voteTeams;

    public VoteFindDto(Long voteId, String voteName) {
      this.voteId = voteId;
      this.voteName = voteName;
      this.voteTeams = null;
    }

    @Getter
    @RequiredArgsConstructor
    public static class VoteTeamFindDto {

      private final Long voteTeamId;
      private final String poster;
      private final List<VoteCandidateFindDto> candidates;

      public static VoteTeamFindDto from(VoteTeam voteTeam) {
        return new VoteTeamFindDto(
            voteTeam.getId(),
            voteTeam.getPoster(),
            voteTeam.getCandidates().stream()
                .map(VoteCandidateFindDto::from).toList()
        );
      }
    }

    @Getter
    @RequiredArgsConstructor
    public static class VoteCandidateFindDto {

      private final Long candidateId;
      private final Long userId;
      private final String userName;

      public static VoteCandidateFindDto from(Candidate candidate) {
        return new VoteCandidateFindDto(
            candidate.getId(),
            candidate.getUser().getId(),
            candidate.getUser().getUsername()
        );
      }
    }

    public static VoteFindDto from(Vote vote, List<VoteTeam> voteTeams) {
      return new VoteFindDto(
          vote.getId(),
          vote.getVoteName(),
          voteTeams.stream()
              .map(VoteTeamFindDto::from).toList()
      );
    }

    public static VoteFindDto from(Vote vote) {
      return new VoteFindDto(
          vote.getId(),
          vote.getVoteName()
      );
    }
  }
}