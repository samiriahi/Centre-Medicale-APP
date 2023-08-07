package com.supportportal.repository;

import com.supportportal.domain.MedExam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedExamRepository extends JpaRepository<MedExam, Long> {

}
