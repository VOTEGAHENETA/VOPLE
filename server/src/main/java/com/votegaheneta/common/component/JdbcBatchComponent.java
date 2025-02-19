package com.votegaheneta.common.component;

import com.votegaheneta.vote.dto.PledgeDto;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class JdbcBatchComponent {

  private final JdbcTemplate jdbcTemplate;

  /**
   * userIdList를 받아서 팀 id에 후보자를 추가하는 insert batch 메서드
   * @param voteTeamId
   * @param userIdList
   * @return
   */
  @Transactional
  public void candidateBatchInsert(Long voteTeamId, List<Long> userIdList) {
    if(userIdList.isEmpty()) return;
    StringBuilder sql = new StringBuilder("INSERT INTO candidate (vote_team_id, user_id) VALUES ");
    String values = userIdList.stream()
        .map(id -> "(?, ?)")
        .collect(Collectors.joining(", "));
    sql.append(values);
    Object[] params = new Object[userIdList.size() * 2];
    for (int i = 0; i < userIdList.size(); i++) {
      params[i * 2] = voteTeamId;
      params[i * 2 + 1] = userIdList.get(i);
    }
    jdbcTemplate.update(sql.toString(), params);
  }

  /**
   * 후보자 공약 리스트를 받아서 batch insert 날리는 메서드
   * @param voteTeamId
   * @param pledgeDtoList
   * @return
   */
  @Transactional
  public void pledgeBatchInsert(Long voteTeamId, List<PledgeDto> pledgeDtoList) {
    if(pledgeDtoList.isEmpty()) return;
    StringBuilder sql = new StringBuilder("INSERT INTO pledge (vote_team_id, content) VALUES ");
    String values = pledgeDtoList.stream()
        .map(pledgeDto -> "(?, ?)")
        .collect(Collectors.joining(", "));
    sql.append(values);
    Object[] params = new Object[pledgeDtoList.size() * 2];
    for(int i = 0; i < pledgeDtoList.size(); i++) {
      params[i * 2] = voteTeamId;
      params[i * 2 + 1] = pledgeDtoList.get(i).getContent();
    }
    jdbcTemplate.update(sql.toString(), params);
  }

}
