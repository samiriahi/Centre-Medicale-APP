package com.supportportal.service;

import java.util.List;
import com.supportportal.domain.BpmnStep;
import com.supportportal.repository.BpmnStepRepository;
import org.springframework.stereotype.Service;
@Service
public class BpmnStepService {
    private final BpmnStepRepository bpmnStepRepository;

    public BpmnStepService(BpmnStepRepository bpmnStepRepository) {
        this.bpmnStepRepository = bpmnStepRepository;
    }
    public BpmnStep saveBpmnStep(BpmnStep bpmnStep) {
        return bpmnStepRepository.save(bpmnStep);
    }

    // Méthode pour récupérer tous les BpmnStep de la base de données
    public List<BpmnStep> getAllBpmnSteps() {
        return bpmnStepRepository.findAll();
    }
}
