package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface UserService {
        void saveUser(User user);
        void updateUser(User user);
        void deleteUser(long id);
        List<User> getAllUsers();
        User findByUsername(String username);
        User getUserById(long id);
    }