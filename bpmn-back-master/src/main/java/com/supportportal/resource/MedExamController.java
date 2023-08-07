package com.supportportal.resource;

import com.supportportal.domain.MedExam;
import com.supportportal.repository.MedExamRepository;
import com.supportportal.service.MedExamService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1")
public class MedExamController {

    @Autowired
    private MedExamService medExamService;

    @Autowired
    private MedExamRepository medExamRepository;

    public MedExamController(MedExamService medExamService, MedExamRepository medExamRepository) {
        this.medExamService = medExamService;
        this.medExamRepository = medExamRepository;
    }

    @GetMapping("/MedExam")
    private List<MedExam> getMedExam(){
        return medExamService.getMedExam();
    }

    @PostMapping("/newMedExam")
    private String addExam(@RequestBody MedExam exam){
        this.medExamRepository.save(exam);
        return "exam added successfully";
    }
}
