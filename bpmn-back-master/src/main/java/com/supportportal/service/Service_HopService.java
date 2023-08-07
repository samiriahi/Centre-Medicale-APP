package com.supportportal.service;

import com.supportportal.domain.Service_Hop;
import com.supportportal.repository.Service_HopRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class Service_HopService {
    private Service_HopRepository serviceHopRepository;
    public List<Service_Hop> getService(){
        return serviceHopRepository.findAll();
    }
}
