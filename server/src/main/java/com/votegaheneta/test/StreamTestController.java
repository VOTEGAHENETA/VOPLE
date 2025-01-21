package com.votegaheneta.test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/stream")
@Slf4j
public class StreamTestController {

  @GetMapping("/status")
  public ResponseEntity<Map<String, String>> getStreamStatus() {
    Map<String, String> response = new HashMap<>();
    response.put("rtmpUrl", "rtmp://localhost:1935/live");
    response.put("hlsUrl", "http://localhost:8051/hls");
    return ResponseEntity.ok(response);
  }

//  public ResponseEntity<Map<String, String>> getStreamUrl() {
//    Map<String, String> response = new HashMap<>();
//    response.put("streamURL", "http://localhost:8050/hls/{후보자 pk}.m3u8");
//    return ResponseEntity.ok(response);
//  }
}