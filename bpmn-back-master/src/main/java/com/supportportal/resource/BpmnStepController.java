package com.supportportal.resource;

import com.supportportal.domain.BpmnStep;
import com.supportportal.service.BpmnStepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api")

public class BpmnStepController {
    @Autowired
    private BpmnStepService bpmnStepService;

    // Point de terminaison pour enregistrer un BpmnStep
    @PostMapping("/bpmnsteps")
    public BpmnStep saveBpmnStep(@RequestBody BpmnStep bpmnStep) {
        return bpmnStepService.saveBpmnStep(bpmnStep);
    }

    // Point de terminaison pour récupérer tous les BpmnStep
    @GetMapping("/bpmnsteps")
    public List<BpmnStep> getAllBpmnSteps() {
        return bpmnStepService.getAllBpmnSteps();
    }
}
