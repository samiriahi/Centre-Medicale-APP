package com.supportportal.resource;

import com.supportportal.domain.MedExamR;
import com.supportportal.service.MedExamRService;
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

public class MedExamRController {
    private MedExamRService medExamRService;
    @GetMapping("/MedExamR")
    private List<MedExamR> getMedExamR(){
        return medExamRService.getMedExamR();
    }
}
