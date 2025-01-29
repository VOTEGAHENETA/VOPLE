package com.votegaheneta.chat.dto;

import com.votegaheneta.chat.entity.SessionChat;
import com.votegaheneta.chat.entity.TeamChat;
import java.io.Serializable;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * DTO for {@link com.votegaheneta.chat.entity.SessionChat}
 */
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

  public ChatDto(SessionChat sessionChat) {
    this.nickname = sessionChat.getUser().getNickname();
    this.text = sessionChat.getText();
    this.createdTime = sessionChat.getCreatedTime();
  }

  public ChatDto(TeamChat teamChat) {
    this.nickname = teamChat.getUser().getNickname();
    this.text = teamChat.getText();
    this.createdTime = teamChat.getCreatedTime();
  }
}