package com.votegaheneta.common.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@NoArgsConstructor
public class ApiResponse<T> {
  private int httpStatus;
  private String message;
  private T data;

  private ApiResponse(int httpStatus, String message, T data) {
    this.httpStatus = httpStatus;
    this.message = message;
    this.data = data;
  }

  // 성공 응답시
  public static <T> ApiResponse<T> success(HttpStatus httpStatus, String message, T data) {
    return new ApiResponse<T>(httpStatus.value(), message, data);
  }

  // 실패 응답시
  public static <T> ApiResponse<T> fail(HttpStatus httpStatus, String message) {
    return new ApiResponse<T>(httpStatus.value(), message, null);
  }
}
