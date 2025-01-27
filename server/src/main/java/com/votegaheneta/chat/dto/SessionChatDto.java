package com.votegaheneta.chat.dto;

import com.votegaheneta.chat.entity.SessionChat;
import java.io.Serializable;
import java.time.LocalTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * DTO for {@link com.votegaheneta.chat.entity.SessionChat}
 */
@Getter
@ToString
@NoArgsConstructor
public class SessionChatDto implements Serializable {

  private String nickname;
  private String text;
  private LocalTime createdTime;

  public SessionChatDto(SessionChat sessionChat) {
    this.nickname = sessionChat.getUser().getNickname();
    this.text = sessionChat.getText();
    this.createdTime = sessionChat.getCreatedTime();
  }
}