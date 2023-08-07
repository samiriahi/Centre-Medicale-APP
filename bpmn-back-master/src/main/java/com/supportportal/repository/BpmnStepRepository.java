package com.supportportal.repository;

import com.supportportal.domain.BpmnStep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BpmnStepRepository extends JpaRepository<BpmnStep, Long> {
}
