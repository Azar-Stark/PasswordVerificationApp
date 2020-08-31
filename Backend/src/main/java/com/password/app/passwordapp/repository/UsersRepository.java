package com.password.app.passwordapp.repository;

import com.password.app.passwordapp.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<UserEntity, Integer> {

    public UserEntity findByUser(String user);
}
