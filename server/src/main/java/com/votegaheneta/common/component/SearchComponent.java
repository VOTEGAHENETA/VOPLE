package com.votegaheneta.common.component;

import java.util.Arrays;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class SearchComponent {

  private static final String[] INITIAL = {"ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"};

  public String searchWordReSetting(String word) {
    if(Arrays.asList(INITIAL).contains(word)) {
      switch (word) {
        case "ㄱ": return INITIAL[0];
        case "ㄴ": return INITIAL[1];
        case "ㄷ": return INITIAL[2];
        case "ㄹ": return INITIAL[3];
        case "ㅁ": return INITIAL[4];
        case "ㅂ": return INITIAL[5];
        case "ㅅ": return INITIAL[6];
        case "ㅇ": return INITIAL[7];
        case "ㅈ": return INITIAL[8];
        case "ㅊ": return INITIAL[9];
        case "ㅋ": return INITIAL[10];
        case "ㅌ": return INITIAL[11];
        case "ㅍ": return INITIAL[12];
        case "ㅎ": return INITIAL[13];
      }
    }
    return word;
  }
}
