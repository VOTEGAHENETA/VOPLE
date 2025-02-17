package com.votegaheneta.stream.controller;

import com.votegaheneta.common.response.ApiResponse;
import com.votegaheneta.security.handler.AuthorizationExceptionHandler;
import com.votegaheneta.security.oauth2.CustomOauth2User;
import com.votegaheneta.stream.dto.StreamDto;
import com.votegaheneta.stream.service.StreamService;
import com.votegaheneta.user.entity.Users;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import java.util.EmptyStackException;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authorization.method.HandleAuthorizationDenied;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/live")
public class StreamController {
    private final StreamService streamService;

    @Operation(summary = "스트리밍 권한 조회", description = "참여자가 스트리밍을 할 수 있는지 권한 확인")
    @Parameters({
        @Parameter(name="streamId", description = "teamId와 streamId는 동일한 값", required = true)
    })
    @PreAuthorize("@streamAuth.hasStreamAuthority(#streamId)")
    @HandleAuthorizationDenied(handlerClass = AuthorizationExceptionHandler.class)
    @GetMapping("/{streamId}/status")
    public ApiResponse<Map<String, Boolean>> checkPermission(@PathVariable Long streamId, @AuthenticationPrincipal
    CustomOauth2User oauth2User) {
        Users user = oauth2User.getUser().orElseThrow(EmptyStackException::new);
        boolean permission = streamService.checkPermission(streamId, user.getId());
        return ApiResponse.success(HttpStatus.OK, "스트리밍 정보 조회 성공", Map.of("isCandidate", permission));
    }

    @Operation(summary = "스트리밍 시작/종료", description = "후보자의 스트리밍 시작, 종료 상태 변경")
    @Parameters({
            @Parameter(name="streamId", description = "teamId와 streamId는 동일한 값", required = true),
            @Parameter(name="isStreaming", description = "true는 스트리밍 시작, false는 종료", required = true)
    })
    @PreAuthorize("@streamAuth.isCandidateInStream(#streamId)")
    @HandleAuthorizationDenied(handlerClass = AuthorizationExceptionHandler.class)
    @PutMapping("/{streamId}/status")
    public ApiResponse<Object> updateStreamingStatus(@PathVariable Long streamId, @RequestParam boolean isStreaming,
                                                     @AuthenticationPrincipal CustomOauth2User oauth2User) {
        Users user = oauth2User.getUser().orElseThrow(EmptyStackException::new);
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
    @PreAuthorize("@streamAuth.hasStreamAuthority(#streamId)")
    @HandleAuthorizationDenied(handlerClass = AuthorizationExceptionHandler.class)
    @GetMapping("/{streamId}")
    public ApiResponse<StreamDto> getStreamInfo(@PathVariable Long streamId, @AuthenticationPrincipal
                                                CustomOauth2User oauth2User) {
        Users user = oauth2User.getUser().orElseThrow(EmptyStackException::new);
        StreamDto streamdto = streamService.getStreamInfo(streamId, user.getId());
        return ApiResponse.success(HttpStatus.OK, "스트리밍 정보 조회 성공", streamdto);
    }
}
