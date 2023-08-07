package com.supportportal.service;

import com.supportportal.domain.GroupUser;
import com.supportportal.repository.GroupUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class GroupUserService {
    private GroupUserRepository groupUserRepository;
    public List<GroupUser> getGroupUser(){
        return groupUserRepository.findAll();
    }
}
