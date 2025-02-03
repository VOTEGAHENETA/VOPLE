package com.votegaheneta.vote.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.votegaheneta.vote.service.VoteFindService;
import org.junit.jupiter.api.BeforeEach;
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
}
