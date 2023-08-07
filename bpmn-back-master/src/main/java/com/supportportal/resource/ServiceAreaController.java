package com.supportportal.resource;

import com.supportportal.domain.ServiceArea;
import com.supportportal.service.ServiceAreaService;
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
public class ServiceAreaController {
    private ServiceAreaService serviceAreaService;
    @GetMapping("/serviceArea")
    public List<ServiceArea> getServiceArea(){
        return serviceAreaService.getServiceArea();
    }
}
