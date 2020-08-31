package com.password.app.passwordapp.controller;

import com.password.app.passwordapp.entity.UserEntity;
import com.password.app.passwordapp.exception.ResourceNotFoundException;
import com.password.app.passwordapp.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/saveUserPassword")
public class UsersController {
    @Autowired
    private UsersRepository usersRepository;

    @GetMapping("/users")
    public List<UserEntity> getAllUsers() {
        return usersRepository.findAll();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity< UserEntity > getUserId(@PathVariable(value = "id") Integer id)
            throws ResourceNotFoundException {
        UserEntity user = usersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("user not found for this id :: " + id));
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/users")
    public UserEntity createUser(@RequestBody UserEntity user) {
        return usersRepository.save(user);
    }


    @PutMapping("/users/{id}")
    public ResponseEntity < UserEntity > updateById(@PathVariable(value = "id") Integer id,
                                                      @RequestBody UserEntity userDetails) throws ResourceNotFoundException {
        UserEntity user = usersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("user not found for this id :: " + id));

        user.setPassword(userDetails.getPassword());
        final UserEntity updatedUser = usersRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/users/update/{user}")
    public ResponseEntity < UserEntity > updateUser(@PathVariable(value = "user") String  user,
                                                    @RequestBody UserEntity userDetails) throws ResourceNotFoundException {
        UserEntity userEntity = usersRepository.findByUser(user);
        if(userEntity==null) {
        	UserEntity newUser=new UserEntity(null,user,userDetails.getPassword());
        	usersRepository.save(newUser);
        	return ResponseEntity.ok(newUser);
        }

        userEntity.setPassword(userDetails.getPassword());
        final UserEntity updatedUser = usersRepository.save(userEntity);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/{id}")
    public Map< String, Boolean > deleteUser(@PathVariable(value = "id") Integer id)
            throws ResourceNotFoundException {
        UserEntity user = usersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("user not found for this id :: " + id));

        usersRepository.delete(user);
        Map < String, Boolean > response = new HashMap< >();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

}
