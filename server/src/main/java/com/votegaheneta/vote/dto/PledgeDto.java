package com.votegaheneta.vote.dto;

import com.votegaheneta.vote.entity.Pledge;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for {@link com.votegaheneta.vote.entity.Pledge}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PledgeDto {

  String content;

  public Pledge toEntity() {
    return new Pledge(content);
  }

  public static PledgeDto fromEntity(Pledge pledge) {
    return new PledgeDto(pledge.getContent());
  }
}