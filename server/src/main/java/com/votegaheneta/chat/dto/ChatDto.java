package com.votegaheneta.chat.dto;

import com.votegaheneta.user.dto.UserDto;
import java.io.Serializable;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import util.ColorGenerator;

@AllArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
public class ChatDto implements Serializable {

  private Long userId;
  private String nickname;
  private String text;
  private String color;
//  @JsonFormat(pattern = "HH:mm:ss")
  private LocalTime createdTime;

  public ChatDto() {
    this.color = ColorGenerator.generateColor();
    this.createdTime = LocalTime.now();
  }

  public void setUserInfo(UserDto userDto) {
    this.userId = userDto.getUserId();
    this.nickname = userDto.getNickname();
  }
}