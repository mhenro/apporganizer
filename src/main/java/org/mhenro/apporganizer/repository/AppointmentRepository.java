package org.mhenro.apporganizer.repository;

import org.mhenro.apporganizer.model.entity.Appointment;
import org.mhenro.apporganizer.model.entity.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    @Query("SELECT a FROM Appointment a ORDER BY a.cancelled, a.confirmed, a.date, a.time")
    Page<Appointment> findAppointments(final Pageable pageable);
}
