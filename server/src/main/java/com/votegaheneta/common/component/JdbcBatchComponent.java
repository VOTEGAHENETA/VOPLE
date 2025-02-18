package com.votegaheneta.common.component;

import com.votegaheneta.vote.dto.CandidateDto;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class JdbcBatchComponent {

  // private JdbcTemplate jdbcTemplate;
  // public int candidateBatchInsert(String mainQuery, String subQuery, List<CandidateDto> candidateDtos) {
  //   StringBuilder sql = new StringBuilder("INSERT INTO candidate (user_id, vote_id) ");
  //   sql.append(mainQuery);
  //   // String values = ids.stream()
  //   //     .map(id -> "(?, ?)")
  //   //     .collect(Collectors.joining(", "));
  //   sql.append(values);
  //   Object[] params = new Object[candidateDtos.size() * 2];
  //   return jdbcTemplate.update(sql.toString(), params);
  // }

  // voteTeam

  // pledge

}
