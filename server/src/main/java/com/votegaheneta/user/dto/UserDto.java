package com.votegaheneta.user.dto;

import com.votegaheneta.user.entity.Users;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
  private Long userId;
  private Long kakaoId;
  private String nickname;
  private String username;

  public UserDto(Users user) {
    this.userId = user.getId();
    this.nickname = user.getNickname();
    this.username = user.getUsername();
    this.kakaoId = user.getKakaoId();
  }

  public static Users toEntity(UserDto userDto) {
    return Users.builder()
        .userId(userDto.getUserId())
        .kakaoId(userDto.getKakaoId())
        .nickname(userDto.getNickname())
        .username(userDto.getUsername())
        .build();
  }
}
