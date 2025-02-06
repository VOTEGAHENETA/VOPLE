package com.votegaheneta.stream.controller;

import com.votegaheneta.common.response.ApiResponse;
import com.votegaheneta.stream.dto.StreamDto;
import com.votegaheneta.stream.service.StreamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/live")
public class StreamController {
    private final StreamService streamService;

    @PatchMapping("/{streamId}/status")
    public ApiResponse<Object> updateStreamingStatus(@PathVariable Long streamId, @RequestParam boolean isStreaming) {
        String streamingUrl = streamService.updateStreamingStatus(streamId, isStreaming);
        Map<String, String> m = new HashMap<>();
        m.put("streamingUrl", streamingUrl);
        if (isStreaming) return ApiResponse.success(HttpStatus.OK, "스트리밍 시작 성공", m);
        else return ApiResponse.success(HttpStatus.NO_CONTENT, "스트리밍 종료 성공", null);
    }

    @GetMapping("/{streamId}")
    public ApiResponse<StreamDto> getStreamInfo(@PathVariable Long streamId) {
        StreamDto streamdto = streamService.getStreamInfo(streamId);
        return ApiResponse.success(HttpStatus.OK, "스트리밍 정보 조회 성공", streamdto);
    }
}
