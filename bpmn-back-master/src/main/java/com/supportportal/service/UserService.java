package com.supportportal.service;

import com.supportportal.domain.User;
import com.supportportal.exception.domain.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.List;

public interface UserService {

    User register(String firstName, String lastName, String username, String email) throws UserNotFoundException, UsernameExistException, EmailExistException ;

    List<User> getUsers();

    User findUserByUsername(String username);

    User findUserByEmail(String email);

    User addNewUser (String firstName , String lastName , String username , String email ,String role, boolean isNotLoked  , boolean isActive , MultipartFile profileImage, String category ) throws NotAnImageFileException, UsernameExistException, EmailExistException, IOException;

    User updateUser ( String currentUsername, String newFirstName, String newLastName, String newUsername, String newEmail, String role, boolean isNotLoked  , boolean isActive , MultipartFile profileImage ) throws UsernameExistException, EmailExistException, IOException, NotAnImageFileException;

    void deleteUser (String usename ) throws IOException;

    void resetPassword (String email ) throws MessagingException, EmailNotFoundException;

    User updateProfileImage (String username , MultipartFile profileImage) throws UsernameExistException, EmailExistException, IOException, NotAnImageFileException;

    long getTotalUsers();

    long getActiveUsers();

    long getInactiveUsers();


}
