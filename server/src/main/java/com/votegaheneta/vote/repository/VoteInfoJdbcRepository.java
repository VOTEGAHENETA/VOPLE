package com.votegaheneta.vote.repository;

import com.votegaheneta.user.enums.USER_TYPE;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class VoteInfoJdbcRepository {

  private final JdbcTemplate jdbcTemplate;
  public long bulkInsertUserInfoByVoteIds(Long userId, List<Long> voteIds) {
    StringBuilder sql = new StringBuilder("INSERT INTO vote_info (user_id, vote_id, user_type, has_select) VALUES ");
    String values = voteIds.stream()
        .map(id -> "(?, ?, ?, false)")
        .collect(Collectors.joining(", "));
    sql.append(values);
    Object[] params = new Object[voteIds.size() * 3];
    for (int i = 0; i < voteIds.size(); i++) {
      params[i * 3] = userId;
      params[i * 3 + 1] = voteIds.get(i);
      params[i * 3 + 2] = USER_TYPE.VOTER.name();
    }
    return jdbcTemplate.update(sql.toString(), params);
  }
}
