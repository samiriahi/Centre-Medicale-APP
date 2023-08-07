package com.supportportal.service;


import com.supportportal.domain.ServiceArea;
import com.supportportal.repository.ServiceAreaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ServiceAreaService {
    private ServiceAreaRepository serviceAreaRepository;
    public List<ServiceArea> getServiceArea(){
        return serviceAreaRepository.findAll();
    }
}

