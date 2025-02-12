package com.votegaheneta.common.component;

import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class SearchComponent {

  private static final String INITIAL = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ";
  private static final String[] REGEX = {"[가-깋]", "[나-닣]", "[다-딯]", "[라-맇]", "[마-밓]", "[바-빟]", "[사-싷]", "[아-잏]", "[자-짛]", "[차-칳]", "[카-킿]", "[타-팋]", "[파-핗]", "[하-힣]"};

  public String searchWordReSetting(String word) {
    if(word.equals("")) return word;
    if(INITIAL.contains(word)) {
      int index = INITIAL.indexOf(word);
      if (index != -1) {
        return REGEX[index];
      }
    }
    return word;
  }
}
