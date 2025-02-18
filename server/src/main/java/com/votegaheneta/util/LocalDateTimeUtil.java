package com.votegaheneta.util;

import java.util.TimeZone;
import org.springframework.stereotype.Component;

@Component
public class LocalDateTimeUtil {

  public LocalDateTimeUtil() {
    TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
  }
}
