package com.example.demo.repositories;

import com.example.demo.entities.ReasonEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReasonRepository extends JpaRepository<ReasonEntity, Long> {
}
