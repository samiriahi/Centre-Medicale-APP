package com.supportportal.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ServiceArea {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ServiceArea_Ky")
    private Long ServiceArea_Ky;

    private String ServiceArea_Name;

    @OneToOne(targetEntity = Service_Hop.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "serviceArea_Service_Ky", referencedColumnName = "Service_Ky")
    private Service_Hop serviceArea_Service;
    public Long getServiceArea_Ky() {
        return ServiceArea_Ky;
    }

    public void setServiceArea_Ky(Long serviceArea_Ky) {
        ServiceArea_Ky = serviceArea_Ky;
    }

    public String getServiceArea_Name() {
        return ServiceArea_Name;
    }

    public void setServiceArea_Name(String serviceArea_Name) {
        ServiceArea_Name = serviceArea_Name;
    }


}