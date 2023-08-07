package com.supportportal.resource;


import com.supportportal.domain.HttpResponse;
import com.supportportal.domain.User;
import com.supportportal.exception.ExceptionHandling;
import com.supportportal.exception.domain.*;
import com.supportportal.service.patientService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.supportportal.domain.Patient;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping(path = { "/", "/patient"})
public class PatientController extends ExceptionHandling {

    private patientService patientServicee ;

    @Autowired
    public PatientController (patientService patientServicee){
        this.patientServicee=patientServicee;
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getTotalPatient() {
        long count = patientServicee.getTotalPatient();
        return ResponseEntity.ok(count);
    }
    @GetMapping("/count/men")
    public int getNumberOfMen() {
        return patientServicee.getNumberOfMen();
    }
    @GetMapping("/count/woman")
    public int getNumberOfWomen() {
        return patientServicee.getNumberOfWomen();
    }

    @GetMapping("/count/boys")
    public int getNumberOfBoys() {
        return patientServicee.getNumberOfBoys();
    }
    @GetMapping("/count/girls")
    public int getNumberOfGirls() {
        return patientServicee.getNumberOfGirls();
    }
    @PostMapping("/add")
    public ResponseEntity<Patient> addNewPatient(@RequestParam("firstName") String firstName,
                                                 @RequestParam("lastName") String lastName,
                                                 @RequestParam("adresse") String adresse,
                                                 @RequestParam("genre") String genre,
                                                 @RequestParam("tel") String tel ,
                                                 @RequestParam("patientId") String patientId ,
                                                 @RequestParam("birthDate") String birthDate,
                                                 @RequestParam(value  ="profileImage", required = false ) MultipartFile profileImage ) throws  PatientIdExistException, PatientNotFoundException,NotAnImageFileException {
                                                 Patient newPatient = patientServicee.addNewPatient( firstName ,  lastName ,  adresse ,  genre, tel ,
                                                         patientId,birthDate , profileImage ) ;
                                                  return new  ResponseEntity<>(newPatient,OK);
                                                  }



    @PostMapping("/update")
    public ResponseEntity<Patient> updatePatient(@RequestParam("firstName") String firstName,
                                                 @RequestParam("lastName") String lastName,
                                                 @RequestParam("adresse") String adresse ,
                                                 @RequestParam("tel") String tel,
                                                 @RequestParam("patientId") String patientId ,
                                                 @RequestParam(value ="profileImage", required = false ) MultipartFile profileImage ) throws  NotAnImageFileException {

            Patient updatePatient = patientServicee.updatePatient( firstName ,  lastName ,  adresse , tel ,  profileImage ,  patientId) ;
                                                    return new  ResponseEntity<>(updatePatient,OK);
    }


    @GetMapping("/find/{patientId}")
    public  ResponseEntity<Patient> getPatient (@PathVariable("patientId") String patientId)  {
        Patient patient = patientServicee.findPatientByPatienId(patientId);
        return new  ResponseEntity<>(patient, OK);
    }

    @GetMapping("/list")
    public  ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> patients = patientServicee.getPatients();
        return new  ResponseEntity<>(patients, OK);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpResponse> deletePatient (@PathVariable("id") Long id ) {
        patientServicee.deletePatient(id);
        return response(OK ,"Patient has been  deleted Successfully") ;
    }

    private  ResponseEntity<HttpResponse> response (HttpStatus httpStatus , String message ){
        HttpResponse body = new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase()	,message.toUpperCase() )  ;
        return new  ResponseEntity<>( body , httpStatus ) ;
    }


}
