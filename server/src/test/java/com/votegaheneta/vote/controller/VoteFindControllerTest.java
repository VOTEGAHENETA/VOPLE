package com.votegaheneta.vote.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.votegaheneta.vote.service.VoteFindService;
import org.junit.jupiter.api.BeforeEach;
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
  private VoteFindController voteFindController;

  @Mock
  private VoteCommandController voteCommandController;

  @Mock
  private VoteFindService voteFindService;

  @InjectMocks
  private VoteFindControllerTest voteFindControllerTest;

  private MockMvc mockMvc;
  private ObjectMapper objectMapper;

  @BeforeEach
  void init() {
    mockMvc = MockMvcBuilders.standaloneSetup(voteFindControllerTest).build();
    objectMapper = new ObjectMapper();
  }

  // 성공
//  @Test
//  void findVoteBySessionId_정상처리완료시_200_응답을반환 () throws Exception {
//    // given
//    Long sessionId = 1L;
//    SessionFindDto sessionFindDto = new SessionFindDto(
//        1,
//        "Session 1",
//
//    )
//    // when
//    mockMvc.perform(get("/api/vote/{sessionId}/detail", sessionId))
//        .andExpect(status().isOk());
//    // then
//
//
//  }
  // sessionId 실패
  @Test
  void findVoteBySessionId_잘못된_sessionId_400_응답을반환 () {
    // given


    // when

    // then
  }
  // 존재하지않는 sessionId
  @Test
  void findVoteBySessionId_존재하지않는_sessionId_400_응답을반환 () {
    // given

    // when

    // then
  }

}
