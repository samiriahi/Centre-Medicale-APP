package com.supportportal.service;

import com.supportportal.domain.Room;
import com.supportportal.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {
    private RoomRepository roomRepository;
    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }
    public List<Room> getRoom(){
        return  roomRepository.findAll();
    }

}
