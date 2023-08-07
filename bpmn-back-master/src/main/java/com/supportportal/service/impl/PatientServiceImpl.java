package com.supportportal.service.impl;

import com.supportportal.domain.Patient;
import com.supportportal.exception.domain.*;
import com.supportportal.repository.PatientRepository;
import com.supportportal.service.patientService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

import static com.supportportal.constant.PatientConstant.PATIENT_ALREADY_EXISTS;
import static com.supportportal.constant.PatientConstant.PATIENT_NOT_FOUND;
import static com.supportportal.constant.UserImplConstant.DEFAULT_USER_IMAGE_PATH;

@Service
public class PatientServiceImpl  implements patientService {

    private final PatientRepository patientRepository ;


    @Autowired
    public PatientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }




    @Override
    public long getTotalPatient() {
        return patientRepository.count();
    }
    @Override
    public int getNumberOfMen() {
        return patientRepository.countByGenre("Men");
    }
    @Override
    public int getNumberOfWomen() {
        return patientRepository.countByGenre("Woman");
    }

    @Override
    public int getNumberOfBoys() {
        return patientRepository.countByGenre("Boy");
    }

    @Override
    public int getNumberOfGirls() {
        return patientRepository.countByGenre("Girl");
    }
    @Override
    public List<Patient> getPatients() {
        return patientRepository.findAll();
    }

    @Override
    public Patient findPatientById(Long id) {
        return patientRepository.findPatientById(id);
    }

    @Override
    public Patient findPatientByPatienId(String patientId) {
        return patientRepository.findPatientByPatientId(patientId);
    }

    @Override
    public Patient addNewPatient(String firstName, String lastName, String adresse, String genre, 
                                 String tel, String patientId,String birthDate, MultipartFile profileImage) throws PatientIdExistException, PatientNotFoundException, NotAnImageFileException {
        validateNewPatient(null,patientId ) ;
        Patient patient = new Patient() ;
        patient.setFirstName(firstName);
        patient.setLastName(lastName);
        patient.setAdresse(adresse);
        patient.setPatientId(patientId);
        patient.setTel(tel);
        patient.setGenre(genre);
        patient.setBirthDate(birthDate);
        patient.setProfileImageUrl(getTemporaryProfileImageUrl(patientId));
        saveProfileImage(patient , profileImage) ;
        patientRepository.save(patient);
        return patient ;    }

    private String getTemporaryProfileImageUrl(String patientId) {
        return ServletUriComponentsBuilder.fromCurrentContextPath().path(DEFAULT_USER_IMAGE_PATH + patientId).toUriString();

    }

    private void saveProfileImage(Patient patient, MultipartFile profileImage) {
    }


    @Override
        public Patient updatePatient( String firstName , String lastName , String adresse ,String tel
            , MultipartFile profileImage ,String  patientId )throws  NotAnImageFileException{

        Patient patient = patientRepository.findPatientByPatientId(patientId) ;
            patient.setFirstName(firstName);
            patient.setLastName(lastName);
            patient.setAdresse(adresse);
            patient.setTel(tel);
            saveProfileImage( patient,profileImage) ;
            patientRepository.save(patient);
            return patient ;

    }


    @Override
    public void deletePatient(Long id )  {
        Patient patient = patientRepository.findPatientById(id) ;
        patientRepository.deleteById(patient.getId());

    }


    private Patient validateNewPatient(String currentPatientId , String newPatientId) throws PatientIdExistException, PatientNotFoundException {
        Patient PatientByNom = findPatientByPatienId(newPatientId) ;
        if (StringUtils.isNotBlank(currentPatientId)) {
            Patient currentPatient= findPatientByPatienId(currentPatientId);
            Patient patientByNewNom = findPatientByPatienId(newPatientId) ;
            if(currentPatient== null ) {
                throw new PatientNotFoundException(PATIENT_NOT_FOUND + currentPatientId);
            }
            if (PatientByNom != null && !currentPatient.getId().equals(patientByNewNom.getId())) {
                throw new PatientIdExistException(PATIENT_ALREADY_EXISTS) ;
            }
            return currentPatient ;
        }else {
            if (PatientByNom != null ) {
                throw new PatientIdExistException(PATIENT_ALREADY_EXISTS) ;
            }
            return null ;
        }
    }




}
