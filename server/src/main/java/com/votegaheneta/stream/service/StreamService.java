package com.votegaheneta.stream.service;

import com.votegaheneta.stream.dto.StreamDto;
public interface StreamService {
    String updateStreamingStatus(Long streamId, boolean isStreaming);
    StreamDto getStreamInfo(Long streamId);
}
