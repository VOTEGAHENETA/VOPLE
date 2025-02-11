package com.votegaheneta.util.nickname.repository;

import com.votegaheneta.util.nickname.entity.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttributeRepository extends JpaRepository<Attribute, Long> {
}