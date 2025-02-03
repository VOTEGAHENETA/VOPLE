package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.entity.ElectionSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ElectionSessionRepository extends JpaRepository<ElectionSession, Long> {

}