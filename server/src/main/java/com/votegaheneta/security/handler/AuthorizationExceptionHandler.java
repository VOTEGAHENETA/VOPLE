package com.votegaheneta.security.handler;

import com.votegaheneta.common.response.ApiResponse;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.http.HttpStatus;
import org.springframework.security.authorization.AuthorizationResult;
import org.springframework.security.authorization.method.MethodAuthorizationDeniedHandler;
import org.springframework.stereotype.Component;

@Component
public class AuthorizationExceptionHandler implements MethodAuthorizationDeniedHandler {

  @Override
  public Object handleDeniedInvocation(MethodInvocation methodInvocation,
                                       AuthorizationResult authorizationResult) {
    String methodName = methodInvocation.getMethod().getName();
    String errMsg = String.format("%s 메소드를 실행할 권한이 없음", methodName);
    return ApiResponse.fail(HttpStatus.FORBIDDEN, errMsg);
  }
}
