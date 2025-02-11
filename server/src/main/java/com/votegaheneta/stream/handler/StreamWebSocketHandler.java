package com.votegaheneta.stream.handler;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class StreamWebSocketHandler extends BinaryWebSocketHandler {
    private Process ffmpegProcess;
    private OutputStream ffmpegInput;
    // 스트림 키별 FFmpeg 세션 관리
    private final ConcurrentHashMap<String, FfmpegSession> sessions = new ConcurrentHashMap<>();
    // WebSocketSession ID와 스트림 키 매핑
    private final ConcurrentHashMap<String, String> sessionStreamKeys = new ConcurrentHashMap<>();

    @Value("${spring.data.rtmp.host}")
    private String rtmpBaseUrl;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        session.setBinaryMessageSizeLimit(1024 * 1024);
        session.setTextMessageSizeLimit(1024 * 1024);

        System.out.println("🎥 방송 시작! WebSocket 연결됨.");

        // URL 쿼리에서 스트림 키 추출
        String query = session.getUri().getQuery();
        String streamKey = "0";
        if (query != null && query.contains("streamKey=")) {
            streamKey = query.split("streamKey=")[1];
        }
        // WebSocketSession ID와 스트림 키 매핑 저장
        sessionStreamKeys.put(session.getId(), streamKey);

        String rtmpUrl = rtmpBaseUrl + streamKey;
        System.out.println("RTMP URL: " + rtmpUrl);

        // 동일 스트림 키의 기존 세션 종료 (있다면)
        if (sessions.containsKey(streamKey)) {
            FfmpegSession oldSession = sessions.get(streamKey);
            oldSession.close();
            sessions.remove(streamKey);
            System.out.println("이전 세션 종료됨.");
        }

        // FFmpeg 프로세스 실행 (WebSocket → RTMP 변환)
        ProcessBuilder builder = new ProcessBuilder(
                "ffmpeg", "-i", "pipe:0",
                "-c:v", "libx264", "-preset", "ultrafast",
                // "-tune", "zerolatency",  // 이 옵션 제거
                "-g", "15",
                "-b:v", "3000k",
                "-c:a", "aac", "-b:a", "128k",
                "-f", "flv", rtmpUrl
        );
        builder.redirectErrorStream(true); // stderr를 stdout과 합침
        Process ffmpegProcess = builder.start();
        OutputStream ffmpegInput = ffmpegProcess.getOutputStream();

        // FFmpeg 출력 스트림 소비 스레드
        new Thread(() -> {
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(ffmpegProcess.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println("FFmpeg: " + line);
                }
            } catch (IOException e) {
                System.err.println("FFmpeg 출력 스트림 읽기 오류: " + e.getMessage());
            }
        }).start();

        // 스트림 키를 기준으로 FFmpeg 세션 저장
        sessions.put(streamKey, new FfmpegSession(ffmpegProcess, ffmpegInput));
    }
    @Override
    protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) throws Exception {
        // 현재 세션에 매핑된 스트림 키를 가져옵니다.
        String streamKey = sessionStreamKeys.get(session.getId());
        if (streamKey == null) {
            System.err.println("스트림 키를 찾을 수 없습니다.");
            return;
        }
        // 해당 스트림 키의 FFmpeg 세션을 찾습니다.
        FfmpegSession ffmpegSession = sessions.get(streamKey);
        if (ffmpegSession == null) {
            System.err.println("해당 스트림 키에 대한 FFmpeg 세션이 없습니다.");
            return;
        }

        OutputStream ffmpegInput = ffmpegSession.getFfmpegInput();
        if (ffmpegInput == null) {
            System.err.println("ffmpegInput이 null입니다. 스트림이 이미 종료되었음.");
            return;
        }

        try {
            ffmpegInput.write(message.getPayload().array());
            ffmpegInput.flush();
        } catch (IOException e) {
            System.err.println("데이터 전송 중 IOException 발생: " + e.getMessage());
            ffmpegSession.close();
            sessions.remove(streamKey);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("📴 방송 종료! WebSocket 연결 종료됨.");

        // 해당 세션에 매핑된 스트림 키를 가져와서 FFmpeg 세션 종료
        String streamKey = sessionStreamKeys.remove(session.getId());
        if (streamKey != null) {
            FfmpegSession ffmpegSession = sessions.remove(streamKey);
            if (ffmpegSession != null) {
                ffmpegSession.close();
            }
        }
    }
}