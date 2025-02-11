package com.votegaheneta.common.component;

import java.util.Arrays;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class SearchComponent {

  private static final String[] INITIAL = {"ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"};

  private static final String[] REGEX = {"[가-깋]", "[나-닣]", "[다-딯]", "[라-맇]", "[마-밓]", "[바-빟]", "[사-싷]", "[아-잏]", "[자-짛]", "[차-칳]", "[카-킿]", "[타-팋]", "[파-핗]", "[하-힣]"};

  public String searchWordReSetting(String word) {
    if(Arrays.asList(INITIAL).contains(word)) {
      switch (word) {
        case "ㄱ": return REGEX[0];
        case "ㄴ": return REGEX[1];
        case "ㄷ": return REGEX[2];
        case "ㄹ": return REGEX[3];
        case "ㅁ": return REGEX[4];
        case "ㅂ": return REGEX[5];
        case "ㅅ": return REGEX[6];
        case "ㅇ": return REGEX[7];
        case "ㅈ": return REGEX[8];
        case "ㅊ": return REGEX[9];
        case "ㅋ": return REGEX[10];
        case "ㅌ": return REGEX[11];
        case "ㅍ": return REGEX[12];
        case "ㅎ": return REGEX[13];
      }
    }
    return word;
  }
}
