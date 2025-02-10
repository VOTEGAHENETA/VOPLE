package com.votegaheneta.util;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;

public class LocalDateTimeUtil {

  public static LocalDateTime getLocalDateTime() {
    LocalDateTime now = LocalDateTime.now();
    now.atZone(ZoneId.of("UTC"));
//    now.atZone(ZoneId.of("Asia/Seoul"));
    return LocalDateTime.now();
  }

  public static LocalTime getLocalTime() {
    LocalTime localTime = getLocalDateTime().toLocalTime();
    return localTime;
  }
}
