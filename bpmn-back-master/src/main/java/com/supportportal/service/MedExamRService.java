package com.supportportal.service;

import com.supportportal.domain.MedExamR;
import com.supportportal.repository.MedExamRsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MedExamRService {
    private MedExamRsRepository medExamRessourceRepository;
    public List<MedExamR> getMedExamR(){
        return  medExamRessourceRepository.findAll();
    }
}
