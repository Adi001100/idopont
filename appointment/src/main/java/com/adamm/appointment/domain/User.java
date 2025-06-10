package com.adamm.appointment.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.adamm.appointment.dto.UserCreateDTO;
import com.adamm.appointment.enums.Role;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private String email;
    private String password;
    private String phone;
    private String address;
    private String billingAddress;
    

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Appointment> appointments = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Role role;

    private Boolean isActive;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    public User(UserCreateDTO userCreateDTO) {
        this.fullName = userCreateDTO.firstName() + userCreateDTO.lastName();
        this.email = userCreateDTO.email();
        this.phone = userCreateDTO.phone();
        this.address = userCreateDTO.address();
        this.billingAddress = userCreateDTO.billingAddress();
        this.appointments = new ArrayList<>();
        this.isActive = false;
    }

    @Override
    public String getUsername() {
        return email;
    }
}
