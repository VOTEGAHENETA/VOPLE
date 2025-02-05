package com.votegaheneta.vote.controller;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.argThat;
import static org.mockito.Mockito.eq;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.votegaheneta.vote.controller.request.VoteCastRequest;
import com.votegaheneta.vote.controller.request.VoteCastRequest.VoteSelection;
import com.votegaheneta.vote.service.VoteCommandService;
import com.votegaheneta.vote.service.VoteFindService;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(MockitoExtension.class)
public class VoteCommandControllerTest {

  @Mock
  private VoteCommandService voteCommandService;

  @Mock
  private SimpMessagingTemplate simpMessagingTemplate;

  @Mock
  private VoteFindService voteFindService;

  @InjectMocks
  private VoteCommandController voteCommandController;

  private MockMvc mockMvc;
  private ObjectMapper objectMapper;

  @BeforeEach
  void init() {
    mockMvc = MockMvcBuilders.standaloneSetup(voteCommandController)
        .build();
    objectMapper = new ObjectMapper();
  }

  @Test
  void castVote_정상처리완료시_200_응답을_반환한다() throws Exception {
    // given
    Long sessionId = 1L;
    VoteCastRequest voteCastRequest = new VoteCastRequest(1L,
        List.of(new VoteSelection(1L, 1L)));

    // when & then
    mockMvc.perform(post("/api/vote/{sessionId}/castvote", sessionId)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(voteCastRequest)))
        .andExpect(status().isOk());

    verify(voteCommandService).castVote(
        argThat(req -> req.getUserId().equals(voteCastRequest.getUserId())),
        eq(sessionId)
    );
    verify(simpMessagingTemplate).convertAndSend(eq("/api/vote/" + sessionId),
        Optional.ofNullable(any()));
  }

  @Test
  void castVote_잘못된_요청_바디() throws Exception {
    // given
    Long sessionId = 1L;
    VoteCastRequest voteCastRequest = new VoteCastRequest(null, null);

    // when & then
    mockMvc.perform(post("/api/vote/{sessionid}/castvote", sessionId)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(voteCastRequest)))
        .andExpect(status().isBadRequest());
  }

  @Test
  void castVote_잘못된_세션ID_요청() throws Exception {
    // given
    Long sessionId = -1L;
    VoteCastRequest voteCastRequest = new VoteCastRequest(1L,
        List.of(new VoteSelection(1L, 1L)));

    // when & then
    mockMvc.perform(post("/api/vote/{sessionId}/castvote", sessionId)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(voteCastRequest)))
        .andExpect(status().isBadRequest());
  }

}
