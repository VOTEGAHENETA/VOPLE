package com.votegaheneta.security.authorization;

import com.votegaheneta.user.entity.Users;
import com.votegaheneta.user.enums.USER_TYPE;
import com.votegaheneta.util.AuthenticationUtil;
import com.votegaheneta.vote.entity.SessionUserInfo;
import com.votegaheneta.vote.repository.CandidateRepository;
import com.votegaheneta.vote.repository.ElectionRepository;
import com.votegaheneta.vote.repository.SessionUserInfoRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component("streamAuth")
@RequiredArgsConstructor
public class StreamAuthorization {

  private final ElectionRepository electionRepository;
  private final SessionUserInfoRepository sessionUserInfoRepository;
  private final CandidateRepository candidateRepository;

  public boolean hasStreamAuthority(Long streamId) {
    Users user = AuthenticationUtil.getUserFromAuthentication();
    Long sessionId = electionRepository.findSessionIdByVoteTeamId(streamId);
    List<SessionUserInfo> suiList = sessionUserInfoRepository.findSessionUserInfosByElectionSessionId(sessionId);

    // 세션의 후보자는 무조건 통과
    boolean isCandidate = suiList.stream()
        .filter(sui -> sui.getUserType() == USER_TYPE.CANDIDATE)
        .map(SessionUserInfo::getUser).anyMatch(u -> u.getId() == user.getId());
    if (isCandidate) return true;

    // 투표 안한 사람안에 존재하는지
    return suiList.stream()
        .filter(sui -> !sui.isHasVoted())
        .anyMatch(sui -> sui.getUser().getId() == user.getId());
  }

  public boolean isCandidateInStream(Long streamId) {
    Users user = AuthenticationUtil.getUserFromAuthentication();
    return candidateRepository.existsByVoteTeamIdAndUserId(streamId, user.getId());
  }
}
