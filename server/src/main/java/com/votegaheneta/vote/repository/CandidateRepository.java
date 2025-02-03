package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {

}