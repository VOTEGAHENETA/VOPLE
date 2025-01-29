package com.votegaheneta.vote.dto;

import com.votegaheneta.vote.entity.Candidate;
import com.votegaheneta.vote.entity.VoteTeam;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class VoteResultFindDto {
  private final Long voteId;
  private final String sessionName;
  private final String voteName;
  private final Float totalVotePercent;

  @Getter
  @RequiredArgsConstructor
  public static class VoteTeamResultDto {
    private final Long teamId;
//    private final String poster;
    private final Float teamVotePercent;
    private final List<VoteCandidateResultDto> voteCandidateDtos;

    public static VoteTeamResultDto from(VoteTeam voteTeam, Float teamVotePercent) {
      return new VoteTeamResultDto(
          voteTeam.getId(),
          //voteTeam.getPoster(),
          teamVotePercent,
          voteTeam.getCandidates().stream().map(VoteCandidateResultDto::from).toList()
      );
    }
  }

  @Getter
  @RequiredArgsConstructor
  public static class VoteCandidateResultDto {

    private final Long candidateId;
    private final Long userId;
    private final String userName;

    public static VoteResultFindDto.VoteCandidateResultDto from(Candidate candidate) {
      return new VoteResultFindDto.VoteCandidateResultDto(
          candidate.getId(),
          candidate.getUser().getId(),
          candidate.getUser().getUsername()
      );
    }
  }

  public static VoteResultFindDto from() {}

}
