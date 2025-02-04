package com.votegaheneta.vote.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.votegaheneta.common.response.ApiResponse;
import com.votegaheneta.vote.dto.SessionFindDto;
import com.votegaheneta.vote.dto.SessionFindDto.VoteFindDto;
import com.votegaheneta.vote.dto.SessionFindDto.VoteFindDto.VoteCandidateFindDto;
import com.votegaheneta.vote.dto.SessionFindDto.VoteFindDto.VoteTeamFindDto;
import com.votegaheneta.vote.dto.SessionResultFindDto;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult.CandidateResult;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult.TeamResult;
import com.votegaheneta.vote.service.VoteFindService;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(MockitoExtension.class)
public class VoteFindControllerTest {

  @Mock
  private VoteFindService voteFindService;

  @InjectMocks
  private VoteFindController voteFindController;

  private MockMvc mockMvc;
  private ObjectMapper objectMapper;

  @BeforeEach
  void init() {
    mockMvc = MockMvcBuilders.standaloneSetup(voteFindController).build();
    objectMapper = new ObjectMapper();
  }

  @DisplayName("세션 ID로 투표 정보 조회 - 정상 처리")
  @Test
  void findVoteBySessionId_whenValidSessionId_thenReturnSessionFindDto() throws Exception {
    // given
    Long sessionId = 1L;
    SessionFindDto sessionFindDto = createSessionFindDto();

    // when
    when(voteFindService.findVoteBySessionId(sessionId)).thenReturn(sessionFindDto);

    // then
    ApiResponse<SessionFindDto> apiResponse = voteFindController.findVoteBySessionId(sessionId);
    assertThat(apiResponse.getData()).usingRecursiveComparison().isEqualTo(sessionFindDto);
  }

  private SessionFindDto createSessionFindDto() {
    VoteCandidateFindDto voteCandidateFindDto = new VoteCandidateFindDto(1L, 1L, "최효재");
    VoteTeamFindDto voteTeamFindDto = new VoteTeamFindDto(1L, "poster", List.of(voteCandidateFindDto));
    VoteFindDto voteFindDto = new VoteFindDto(1L, "test", List.of(voteTeamFindDto));
    return new SessionFindDto(
        1L,
        "Session 1",
        List.of(voteFindDto));
  }

  @DisplayName("세션 ID 유효성 검증 - 음수 값")
  @Test
  void findVoteBySessionId_whenNegativeSessionId_thenThrowIllegalArgumentException() {
    // given
    Long sessionId = -1L;

    // when
    when(voteFindService.findVoteBySessionId(sessionId))
        .thenThrow(new IllegalArgumentException("세션 정보를 찾을 수 없습니다."));

    // then
    assertThatThrownBy(
        () -> voteFindController.findVoteBySessionId(sessionId))
        .isInstanceOf(IllegalArgumentException.class)
        .hasMessage("세션 정보를 찾을 수 없습니다.");
  }

  @DisplayName("세션 ID 유효성 검증 - 존재하지 않는 값")
  @Test
  void findVoteBySessionId_whenNotExistSessionId_thenThrowIllegalException() {
    // given
    Long sessionId = 99_999_999_999L;

    // when
    when(voteFindService.findVoteBySessionId(sessionId))
        .thenThrow(new IllegalArgumentException("세션 정보를 찾을 수 없습니다."));

    // then
    assertThatThrownBy(() -> voteFindController.findVoteBySessionId(sessionId))
        .isInstanceOf(IllegalArgumentException.class)
        .hasMessage("세션 정보를 찾을 수 없습니다.");
  }

  @DisplayName("세션 ID 투표 진행 결과 조회 - 정상 조회")
  @Test
  void findVoteFinalResultBySessionId_whenValidSessionId_thenReturnSessionResultFindDto() throws Exception {
    // given
    Long sessionId = 1L;


    // when


    // then

  }

  private SessionResultFindDto createSessionResultFindDto() {
    CandidateResult candidateResult = new CandidateResult(1, 1, "최효재");
    TeamResult teamResult = new TeamResult(1l, "poster", 0.0f, 0, List.of(candidateResult));
    VoteResult voteResult = new VoteResult(1, "test", List.of(teamResult));
//    return new Session
    return null;
  }
  

}
