package com.supportportal.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MedExamStep {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="MedExamstp_Ky", unique = true)
    private  long MedExamstp_Ky ;
    private String MedExamstp_Name;
    @OneToOne( targetEntity = MedExam.class ,cascade = CascadeType.ALL)
    @JoinColumn (name="MedExamstp_MedExamKy",referencedColumnName = "MedExam_Ky")
    private MedExam MedExamstp_MedExamKy;
}
