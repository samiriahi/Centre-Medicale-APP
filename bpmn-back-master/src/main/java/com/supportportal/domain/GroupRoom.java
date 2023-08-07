package com.supportportal.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class GroupRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GroupRoom_Ky", unique = true)
    private Long GroupRoom_Ky;

    private String GroupRoom_Name;

    @OneToOne(targetEntity = ServiceArea.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "GroupRoom_serviceArea_Ky", referencedColumnName = "ServiceArea_Ky")
    private ServiceArea GroupRoom_serviceArea;

    public Long getGroupRoom_Ky() {
        return GroupRoom_Ky;
    }

    public void setGroupRoom_Ky(Long groupRoom_Ky) {
        GroupRoom_Ky = groupRoom_Ky;
    }

    public String getGroupRoom_Name() {
        return GroupRoom_Name;
    }

    public void setGroupRoom_Name(String groupRoom_Name) {
        GroupRoom_Name = groupRoom_Name;
    }




}
