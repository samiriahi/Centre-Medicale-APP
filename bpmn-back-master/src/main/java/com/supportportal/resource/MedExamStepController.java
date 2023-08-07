package com.supportportal.resource;

import com.supportportal.domain.MedExamStep;
import com.supportportal.service.MedExamStepService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/v1")
public class MedExamStepController {
    private MedExamStepService medExamStepService;
    @GetMapping("/MedExamStep")
    private List<MedExamStep> getMedExamStep(){
        return medExamStepService.getMedExamStep();
    }
}