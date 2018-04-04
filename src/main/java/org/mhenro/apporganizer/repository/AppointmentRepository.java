package org.mhenro.apporganizer.repository;

import org.mhenro.apporganizer.model.entity.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AppointmentRepository extends PagingAndSortingRepository<Appointment, Long> {
    @Query("SELECT a FROM Appointment a ORDER BY a.cancelled, a.confirmed, a.date, a.time")
    Page<Appointment> findAppointments(final Pageable pageable);
}
