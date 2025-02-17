package com.votegaheneta.security.authorization;

import com.votegaheneta.user.entity.Users;
import com.votegaheneta.util.AuthenticationUtil;
import com.votegaheneta.vote.entity.SessionUserInfo;
import com.votegaheneta.vote.entity.VoteTeam;
import com.votegaheneta.vote.repository.SessionUserInfoRepository;
import com.votegaheneta.vote.repository.VoteTeamRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component("chatAuth")
@RequiredArgsConstructor
public class ChatAuthorization {

  private final SessionUserInfoRepository sessionUserInfoRepository;
  private final VoteTeamRepository voteTeamRepository;

  public boolean isUserAuthorizedInChat(String type, Long roomId) {
    Users user = AuthenticationUtil.getUserFromAuthentication();
    return switch (type) {
      case "session" -> validateSession(roomId, user);
      case "team" -> validateVoteTeam(roomId, user);
      default -> throw new IllegalArgumentException("Type이 잘못되었습니다.");
    };
  }

  private boolean validateVoteTeam(Long roomId, Users user) {
    Optional<VoteTeam> voteTeam = voteTeamRepository.findVoteTeamWithVoteAndElection(roomId);
    // voteTeam Id 자체가 잘못됐을 경우
    if (voteTeam.isEmpty()) {
      return false;
    }

    long sessionId = voteTeam.get().getVote().getElectionSession().getId();
    Optional<SessionUserInfo> sui = sessionUserInfoRepository.findByElectionSessionIdAndUser(sessionId, user);
    // voteTeam이 속한 세션에 내가 참여하고 있지 않은 경우
    // 투표를 아직 안했어야 이 팀 채팅방에 참여 가능함
    return sui.filter(sessionUserInfo -> !sessionUserInfo.isHasVoted()).isPresent();
  }

  private boolean validateSession(Long sessionId, Users user) {
    Optional<SessionUserInfo> sui = sessionUserInfoRepository.findByElectionSessionIdAndUser(
        sessionId, user);
    return sui.map(SessionUserInfo::isHasVoted).orElse(false);// 세션에 존재하고 투표가 끝난사람만 접근권한 있음
  }
}
