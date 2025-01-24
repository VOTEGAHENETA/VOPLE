package com.votegaheneta.stream.repository;

import com.votegaheneta.stream.entity.Stream;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StreamRepository extends JpaRepository<Stream, Long> {

}