package com.supportportal.repository;

import com.supportportal.domain.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient,Long> {
     Patient findPatientById(Long id) ;
     Patient findPatientByPatientId(String patientId) ;

    int countByGenre(String genre);
    }
