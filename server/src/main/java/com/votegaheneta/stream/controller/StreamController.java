package com.votegaheneta.stream.controller;

import com.votegaheneta.common.response.ApiResponse;
import com.votegaheneta.stream.dto.StreamDto;
import com.votegaheneta.stream.service.StreamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
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

    @Operation(summary = "스트리밍 시작/종료", description = "후보자의 스트리밍 시작, 종료 상태 변경")
    @Parameters({
            @Parameter(name="streamId", description = "teamId와 streamId는 동일한 값", required = true),
            @Parameter(name="isStreaming", description = "true는 스트리밍 시작, false는 종료", required = true)
    })
    @PutMapping("/{streamId}/status")
    public ApiResponse<Object> updateStreamingStatus(@PathVariable Long streamId, @RequestParam boolean isStreaming) {
        String streamingUrl = streamService.updateStreamingStatus(streamId, isStreaming);
        Map<String, String> m = new HashMap<>();
        m.put("streamingUrl", streamingUrl);
        if (isStreaming) return ApiResponse.success(HttpStatus.OK, "스트리밍 시작 성공", m);
        else return ApiResponse.success(HttpStatus.NO_CONTENT, "스트리밍 종료 성공", null);
    }

    @Operation(summary = "스트리밍 정보 조회", description = "참가자가 참여한 스트리밍 페이지 접근")
    @Parameters({
            @Parameter(name="streamId", description = "teamId와 streamId는 동일한 값", required = true)
    })
    @GetMapping("/{streamId}")
    public ApiResponse<StreamDto> getStreamInfo(@PathVariable Long streamId) {
        StreamDto streamdto = streamService.getStreamInfo(streamId);
        return ApiResponse.success(HttpStatus.OK, "스트리밍 정보 조회 성공", streamdto);
    }
}
