package com.votegaheneta.vote.dto;

import com.votegaheneta.vote.entity.Candidate;
import com.votegaheneta.vote.entity.Vote;
import com.votegaheneta.vote.entity.VoteTeam;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class SessionFindDto {

  private final Long sessionId;
  private final String sessionName;
  private final String voteStatus;
  private final List<VoteFindDto> voteFindDtos;

  @Getter
  @RequiredArgsConstructor
  public static class VoteFindDto {

    private final Long voteId;
    private final String voteName;
    private final List<VoteTeamFindDto> voteTeams;

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
  }
}