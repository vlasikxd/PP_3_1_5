package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface UserService {
        void saveUser(User user, String role);
        void updateUser(long id, User user, String role);
        void deleteUser(long id);
        List<User> getAllUsers();
        User getUserById(long id);

        User findByUsername(String username);
    }