package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Long> {

}