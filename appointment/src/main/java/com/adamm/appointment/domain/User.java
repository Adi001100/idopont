package com.adamm.appointment.domain;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.adamm.appointment.dto.UserCreateDTO;
import com.adamm.appointment.enums.Role;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@EntityListeners(AuditingEntityListener.class)
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

    private Boolean active;
    private Boolean locked;
    private int failedLoginAttempts;
    
    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    private Instant lastLogin;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    public User(UserCreateDTO userCreateDTO) {
        this.fullName = userCreateDTO.fullName();
        this.email = userCreateDTO.email();
        this.phone = userCreateDTO.phone();
        this.address = userCreateDTO.address();
        this.billingAddress = userCreateDTO.billingAddress();
        this.appointments = new ArrayList<>();
        this.active = true;
        this.locked = false;
        this.role = Role.CLIENT;
        this.failedLoginAttempts = 0;
    }

    @Override
    public String getUsername() {
        return email;
    }
}
