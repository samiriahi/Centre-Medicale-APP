package com.supportportal.repository;

import com.supportportal.domain.GroupUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupUserRepository extends JpaRepository<GroupUser, Long> {
}
