package com.supportportal.resource;

import com.supportportal.domain.Room;
import com.supportportal.repository.RoomRepository;
import com.supportportal.service.RoomService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/v1")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomRepository roomRepository;
    @GetMapping("/Room")
    public List<Room> getRoom(){
        return roomService.getRoom();
    }

    @PostMapping("/newRoom")
    public String addRoom(@RequestBody Room room){
        this.roomRepository.save(room);
        return "room added successfully";
    }

}
