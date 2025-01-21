package com.votegaheneta.server;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class StreamingIntegrationTest {

  @Autowired
  private MockMvc mockMvc;

  @Test
  void testStreamEndpoints() throws Exception {
    MvcResult result = mockMvc.perform(get("/api/stream/status"))
        .andDo(print())  // 결과를 로그로 출력
        .andExpect(status().isOk())
        .andReturn();

    // 응답 내용 출력
    System.out.println("Response: " + result.getResponse().getContentAsString());
  }

  // HLS 테스트는 일단 제외
    /*
    @Test
    void testHlsEndpoint() {
        String hlsUrl = "http://localhost:8051/hls/test/index.m3u8";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(hlsUrl, String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
    */
}