package com.example.DigitalWellness.repository;

import com.example.DigitalWellness.model.UsageEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsageEntryRepository extends JpaRepository<UsageEntry, Long> {
}
