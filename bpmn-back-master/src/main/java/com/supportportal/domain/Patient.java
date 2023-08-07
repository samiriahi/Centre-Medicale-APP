package com.supportportal.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.io.Serializable;

@Entity

public class Patient implements Serializable  {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String patientId;
    private String firstName;
    private String lastName;
    private String adresse;
    private String tel;
    private String genre;
    private String profileImageUrl;
    private String birthDate ;

    public Patient(){}

    public Patient(Long id, String patientId, String firstName, String lastName,
                   String adresse, String tel, String genre, String profileImageUrl, String birthDate) {
        this.id = id;
        this.patientId = patientId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.adresse = adresse;
        this.tel = tel;
        this.genre = genre;
        this.profileImageUrl = profileImageUrl;
        this.birthDate = birthDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }
    @JsonFormat(pattern = "yyyy-MM-dd")

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }
}
