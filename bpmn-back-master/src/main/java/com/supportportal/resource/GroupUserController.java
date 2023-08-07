package com.supportportal.resource;

import com.supportportal.domain.GroupUser;
import com.supportportal.service.GroupUserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/v1")
public class GroupUserController {
    private GroupUserService groupUserService;
    @GetMapping("/GroupUser")
    public List<GroupUser> getGroupUser(){
        return   groupUserService.getGroupUser();
    }
}
