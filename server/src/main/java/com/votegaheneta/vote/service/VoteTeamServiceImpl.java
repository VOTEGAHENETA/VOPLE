package com.votegaheneta.vote.service;

import com.votegaheneta.user.dto.UserDto;
import com.votegaheneta.user.entity.Users;
import com.votegaheneta.user.enums.USER_TYPE;
import com.votegaheneta.user.repository.UsersRepository;
import com.votegaheneta.vote.controller.request.CandidateRequestDto;
import com.votegaheneta.vote.entity.Candidate;
import com.votegaheneta.vote.entity.Vote;
import com.votegaheneta.vote.entity.VoteInfo;
import com.votegaheneta.vote.entity.VoteTeam;
import com.votegaheneta.vote.repository.VoteInfoRepository;
import com.votegaheneta.vote.repository.VoteRepository;
import com.votegaheneta.vote.repository.VoteTeamRepository;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class VoteTeamServiceImpl implements VoteTeamService {

  private final VoteTeamRepository voteTeamRepository;
  private final VoteRepository voteRepository;
  private final UsersRepository usersRepository;
  private final VoteInfoRepository voteInfoRepository;

  @Transactional
  @Override
  public void modifyVoteTeam(Long sessionId, Long voteId, CandidateRequestDto candidateRequest) {
    deleteAllVoteTeam(voteId);
    createVoteTeam(voteId, candidateRequest);
    updateUserTypeInVoteInfo(voteId, candidateRequest);
  }

  private void updateUserTypeInVoteInfo(Long voteId, CandidateRequestDto candidateRequest) {
    List<VoteInfo> voteInfoList = voteInfoRepository.findAllByVoteId(voteId);
    List<List<UserDto>> voteTeamList = candidateRequest.getVoteTeamList();
    long[] candidateUserIds = voteTeamList.stream().flatMap(List::stream)
        .mapToLong(UserDto::getUserId)
        .sorted().toArray();
    voteInfoList.forEach(voteInfo -> voteInfo.setUserType(USER_TYPE.VOTER));
    voteInfoList.stream()
        .filter(voteInfo -> Arrays.binarySearch(candidateUserIds, voteInfo.getUser().getId()) >= 0)
        .forEach(voteInfo -> voteInfo.setUserType(USER_TYPE.CANDIDATE));
  }

  private void deleteAllVoteTeam(Long voteId) {
    voteTeamRepository.deleteVoteTeamByVoteId(voteId);
  }

  private void createVoteTeam(Long voteId, CandidateRequestDto request) {
    Vote vote = voteRepository.findById(voteId)
        .orElseThrow(() -> new IllegalArgumentException("투표가 존재하지 않습니다."));
    List<List<UserDto>> voteTeamList = request.getVoteTeamList();
    for (List<UserDto> userDtos : voteTeamList) {
      VoteTeam voteTeam = new VoteTeam();
      for (UserDto userDto : userDtos) {
        Users user = usersRepository.findById(userDto.getUserId())
            .orElseThrow(() -> new IllegalArgumentException("유저가 존재하지 않습니다."));
        voteTeam.addCandidate(new Candidate(user));
      }
      vote.addVoteTeam(voteTeam);
    }
  }

  private void createCandidate(Long voteTeamId, Long userId) {

  }
}
