package com.supportportal.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class GroupUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="GroupUser_Ky", unique = true)
    private   long GroupUser_Ky;
    private String GroupUser_Name ;

    @OneToOne( targetEntity = Service_Hop.class ,cascade = CascadeType.ALL)
    @JoinColumn (name="GroupUser_Srvc",referencedColumnName = "Service_Ky")
    private Service_Hop GroupUser_Srvc;

    @JsonManagedReference
    @OneToMany
    private List<User> members;


}
