package com.password.app.passwordapp.entity;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class UserEntity {
    private Integer id;
    private String user;
    private String password;

    public UserEntity(Integer id, String user, String password) {
        this.id = id;
        this.user = user;
        this.password = password;
    }
    public UserEntity() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(name = "user", nullable = false)
    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    @Column(name = "password", nullable = false)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
