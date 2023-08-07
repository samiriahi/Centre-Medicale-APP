package com.supportportal.resource;

import com.supportportal.service.ConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ConsultationController {

    @Autowired
    private ConsultationService consultationService;

    public ConsultationController(ConsultationService consultationService) {
        this.consultationService = consultationService;
    }

    @PostMapping("/addConsultation")
    public Consultation addNewConsultation(@RequestBody Consultation consultation){
        return this.consultationService.addNewConsultation(consultation);
    }

    @GetMapping("/getAllConsultation")
    public List<Consultation> getAllConsultation(){
        return this.consultationService.getAllConsultations();
    }

    @GetMapping("consultationById/{id}")
    public Consultation getConsultationById(@PathVariable int id){
        return this.consultationService.getConsultationById(id);
    }
}
