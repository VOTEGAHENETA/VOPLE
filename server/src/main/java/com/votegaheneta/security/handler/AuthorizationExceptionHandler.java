package com.votegaheneta.security.handler;

import org.aopalliance.intercept.MethodInvocation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.AuthorizationResult;
import org.springframework.security.authorization.method.MethodAuthorizationDeniedHandler;
import org.springframework.stereotype.Component;

@Component
public class AuthorizationExceptionHandler implements MethodAuthorizationDeniedHandler {

  @Override
  public Object handleDeniedInvocation(MethodInvocation methodInvocation,
                                       AuthorizationResult authorizationResult) {
    String methodName = methodInvocation.getMethod().getName();
    String errMsg = String.format("%s 메소드에서 에러 발생함", methodName);
    return new ResponseEntity<String>(errMsg, HttpStatus.FORBIDDEN);
  }
}
