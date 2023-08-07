package com.supportportal.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MedExamR {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="MedExamR_Ky" , unique = true)
    private  long MedExamR_Ky ;
    @OneToOne( targetEntity = User.class ,cascade = CascadeType.ALL)
    @JoinColumn (name="MedExamR_UKy",referencedColumnName = "id")
    private User MedExamR_UK ;
    @OneToOne( targetEntity = Room.class ,cascade = CascadeType.ALL)
    @JoinColumn (name="MedExamR_RKy",referencedColumnName = "Room_Ky")
    private Room MedExamR_RK ;
    @OneToOne( targetEntity = MedExamStep.class ,cascade = CascadeType.ALL)
    @JoinColumn (name="MedExamR_stpKy",referencedColumnName = "MedExamStp_Ky")
    private long MedExamR_stpKy;
}
