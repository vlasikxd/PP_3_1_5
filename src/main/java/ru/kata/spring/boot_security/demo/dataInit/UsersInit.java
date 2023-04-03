package ru.kata.spring.boot_security.demo.dataInit;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@Component
public class UsersInit {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UsersInit(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @PostConstruct
    public void createAdmin() {
        Role role1 = new Role("ROLE_ADMIN");
        Role role2 = new Role("ROLE_USER");
        if (roleRepository.findRoleByRole(role1.getRole()) == null) roleRepository.save(role1);
        if (roleRepository.findRoleByRole(role2.getRole()) == null) roleRepository.save(role2);

        User admin = new User(null, null, null, "admin@1.ru",
                new BCryptPasswordEncoder().encode("admin"));
        admin.setRoles(new HashSet<>(Set.of(role1, role2)));
        if (userRepository.findByUsername(admin.getUsername()) == null) {
            userRepository.save(admin);
        }
    }
}



