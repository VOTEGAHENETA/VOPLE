package com.votegaheneta.stream.handler;

import java.io.IOException;
import java.io.OutputStream;

public class FfmpegSession {
    private Process process;
    private OutputStream ffmpegInput;

    public FfmpegSession(Process process, OutputStream ffmpegInput) {
        this.process = process;
        this.ffmpegInput = ffmpegInput;
    }

    public OutputStream getFfmpegInput() {
        return ffmpegInput;
    }

    public void close() {
        try {
            if (ffmpegInput != null) {
                ffmpegInput.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (process != null && process.isAlive()) {
            process.destroy();
        }
    }
}
