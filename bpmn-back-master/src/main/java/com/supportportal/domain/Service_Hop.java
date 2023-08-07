package com.supportportal.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Service_Hop {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name ="Service_Ky")
    private Long Service_Ky;
    private String Service_Name;

    public Long getService_Ky() {
        return Service_Ky;
    }

    public void setService_Ky(Long service_Ky) {
        Service_Ky = service_Ky;
    }

    public String getService_Name() {
        return Service_Name;
    }

    public void setService_Name(String service_Name) {
        Service_Name = service_Name;
    }
}

