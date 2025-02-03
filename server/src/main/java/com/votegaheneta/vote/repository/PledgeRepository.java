package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.entity.Pledge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PledgeRepository extends JpaRepository<Pledge, Long> {

  // 엔티티 사용

}