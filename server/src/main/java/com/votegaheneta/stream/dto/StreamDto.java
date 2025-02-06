package com.votegaheneta.stream.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.votegaheneta.stream.entity.Stream;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StreamDto {
    private Long streamId;
    private String streamingUrl;

    @JsonProperty("isStreaming")
    private boolean isStreaming;

    public static StreamDto fromEntity(Stream stream) {
        return new StreamDto(stream.getId(), stream.getStreamingUrl(), stream.isStreaming());
    }
}
