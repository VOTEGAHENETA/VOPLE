package com.votegaheneta.chat.dto;

import java.io.Serializable;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ChatDto implements Serializable {

  private String nickname;
  private String text;
//  @JsonFormat(pattern = "HH:mm:ss")
  private LocalTime createdTime;

  public ChatDto() {
    this.createdTime = LocalTime.now();
  }
}