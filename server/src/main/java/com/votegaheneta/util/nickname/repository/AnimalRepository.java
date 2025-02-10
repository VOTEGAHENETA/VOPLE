package com.votegaheneta.util.nickname.repository;

import com.votegaheneta.util.nickname.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animal, Long> {

}