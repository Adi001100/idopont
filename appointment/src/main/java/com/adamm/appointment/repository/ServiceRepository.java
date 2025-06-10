package com.adamm.appointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adamm.appointment.domain.Service;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {

}
