package com.supportportal.service;


import com.supportportal.domain.MedExamStep;
import com.supportportal.repository.MedExamStepRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedExamStepService {
    private MedExamStepRepository medExamStepRepository;
    public List<MedExamStep> getMedExamStep(){
        return   medExamStepRepository.findAll();
    }

}
