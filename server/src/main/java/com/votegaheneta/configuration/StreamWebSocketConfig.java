package com.votegaheneta.configuration;

import com.votegaheneta.stream.handler.StreamWebSocketHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class StreamWebSocketConfig implements WebSocketConfigurer {
    private final StreamWebSocketHandler streamWebSocketHandler;

    public StreamWebSocketConfig(StreamWebSocketHandler streamWebSocketHandler) {
        this.streamWebSocketHandler = streamWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(streamWebSocketHandler, "/stream").setAllowedOrigins("*");
    }
}