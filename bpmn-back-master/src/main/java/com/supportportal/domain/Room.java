package com.supportportal.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Room_Ky",unique = true)
    private Long Room_Ky;
    private String Room_Name ;
    @OneToOne( targetEntity = GroupRoom.class ,cascade = CascadeType.ALL)
    @JoinColumn (name="Room_GroupRoomKy",referencedColumnName = "GroupRoom_Ky")
    private GroupRoom Room_GroupRoomKy ;

    public Long getRoom_Ky() {
        return Room_Ky;
    }

    public void setRoom_Ky(Long room_Ky) {
        Room_Ky = room_Ky;
    }

    public String getRoom_Name() {
        return Room_Name;
    }

    public void setRoom_Name(String room_Name) {
        Room_Name = room_Name;
    }

    public GroupRoom getRoom_GroupRoomKy() {
        return Room_GroupRoomKy;
    }

    public void setRoom_GroupRoomKy(GroupRoom room_GroupRoomKy) {
        Room_GroupRoomKy = room_GroupRoomKy;
    }
}
