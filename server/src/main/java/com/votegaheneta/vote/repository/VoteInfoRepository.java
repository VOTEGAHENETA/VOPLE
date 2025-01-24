package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.entity.VoteInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteInfoRepository extends JpaRepository<VoteInfo, Long> {

}