package com.supportportal.service;

import com.supportportal.domain.GroupRoom;
import com.supportportal.repository.GroupRoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class GroupRoomService {
    private GroupRoomRepository groupRoomRepository;
    public List<GroupRoom> getGroupRoom(){
        return groupRoomRepository.findAll();

    }

}


