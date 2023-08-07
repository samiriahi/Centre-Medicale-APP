package com.supportportal.service;

import com.supportportal.domain.Patient;
import com.supportportal.domain.User;
import com.supportportal.exception.domain.*;
import com.supportportal.repository.PatientRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

public interface patientService {

    long getTotalPatient();

    int getNumberOfMen();

    int getNumberOfWomen();

    int getNumberOfBoys();

    int getNumberOfGirls();

    public List<Patient> getPatients();
    public Patient findPatientById(Long id);
    public Patient findPatientByPatienId(String id);

    public Patient addNewPatient(String firstName , String lastName , String adresse ,
                               String genre , String tel, String patientId  , String birthDate , MultipartFile profileImage ) throws  PatientIdExistException, PatientNotFoundException,NotAnImageFileException;

    public Patient updatePatient( String firstName , String lastName , String adresse ,String tel
                                    , MultipartFile profileImage ,String  patientId ) throws
                                      NotAnImageFileException;




    public void deletePatient(Long id );

}
