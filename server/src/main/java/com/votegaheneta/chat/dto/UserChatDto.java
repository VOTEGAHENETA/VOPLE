package com.votegaheneta.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class UserChatDto {

  private Long userId;
  private String nickname;
}
