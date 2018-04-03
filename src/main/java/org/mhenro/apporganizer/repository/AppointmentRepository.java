package org.mhenro.apporganizer.repository;

import org.mhenro.apporganizer.model.entity.Appointment;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AppointmentRepository extends PagingAndSortingRepository<Appointment, Long> {
}
