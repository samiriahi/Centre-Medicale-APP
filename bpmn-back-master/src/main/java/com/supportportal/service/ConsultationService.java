package com.supportportal.service;

import com.supportportal.repository.ConsultationRepository;
import com.supportportal.resource.Consultation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsultationService {

    @Autowired
    private ConsultationRepository consultationRepository;

    public ConsultationService(ConsultationRepository consultationRepository) {
        this.consultationRepository = consultationRepository;
    }

    public Consultation addNewConsultation(Consultation consultation){
        return this.consultationRepository.save(consultation);
    }

    public List<Consultation> getAllConsultations(){
        return this.consultationRepository.findAll();
    }

    public Consultation getConsultationById(int id){
        return this.consultationRepository.findById(id).get();
    }
}
