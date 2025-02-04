package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session, Long> {

}