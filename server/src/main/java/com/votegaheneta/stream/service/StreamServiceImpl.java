package com.votegaheneta.stream.service;

import com.votegaheneta.stream.dto.StreamDto;
import com.votegaheneta.stream.entity.Stream;
import com.votegaheneta.stream.repository.StreamRepository;
import com.votegaheneta.vote.repository.CandidateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StreamServiceImpl implements StreamService {

    private final StreamRepository streamRepository;
    private final CandidateRepository candidateRepository;

    @Transactional
    public String updateStreamingStatus(Long streamId, boolean isStreaming) {
        Stream stream = streamRepository.findById(streamId)
                .orElseThrow(() -> new IllegalArgumentException("스트리밍 상태를 업데이트할 수 없습니다."));
        stream.setIsStreaming(isStreaming);
        return stream.getStreamingUrl();
    }
    public StreamDto getStreamInfo(Long streamId, Long userId) {
        Stream stream = streamRepository.findById(streamId)
                .orElseThrow(() -> new IllegalArgumentException("스트리밍 정보를 얻어올 수 없습니다."));
        return StreamDto.fromEntity(stream);
    }

    public boolean checkPermission(Long streamId, Long userId) {
        return candidateRepository.existsByVoteTeamIdAndUserId(streamId, userId);
    }
}
