package org.mhenro.apporganizer.service;

import org.mhenro.apporganizer.model.entity.Appointment;
import org.mhenro.apporganizer.model.entity.Company;
import org.mhenro.apporganizer.model.exception.ObjectNotFoundException;
import org.mhenro.apporganizer.model.exception.WrongDataException;
import org.mhenro.apporganizer.model.request.AppointmentNoteRequest;
import org.mhenro.apporganizer.model.request.AppointmentRequest;
import org.mhenro.apporganizer.repository.AppointmentRepository;
import org.mhenro.apporganizer.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
public class AppointmentService {
    private AppointmentRepository appointmentRepository;
    private CompanyRepository companyRepository;

    @Autowired
    public AppointmentService(final AppointmentRepository appointmentRepository, final CompanyRepository companyRepository) {
        this.appointmentRepository = appointmentRepository;
        this.companyRepository = companyRepository;
    }

    public Page<Appointment> getAppointments(final Pageable pageable) {
        return appointmentRepository.findAppointments(pageable);
    }

    public Appointment getAppointmentDetails(final Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Appointment is not found"));
    }

    @Transactional
    public void saveAppointment(final AppointmentRequest request) {
        final Appointment appointment = getAppointmentDetails(request.getAppId());
        final Company company = companyRepository.findById(request.getCompanyId()).orElse(null);
        appointment.setDate(request.getDate());
        appointment.setTime(request.getTime());
        appointment.setCompany(company);
        appointmentRepository.save(appointment);
    }

    @Transactional
    public void confirmAppointment(final Long id) {
        final Appointment appointment = getAppointmentDetails(id);
        if (appointment.getCancelled()) {
            throw new WrongDataException("Appointment is already cancelled");
        }
        appointment.setConfirmed(true);
        appointmentRepository.save(appointment);
    }

    @Transactional
    public void addNoteToAppointment(final AppointmentNoteRequest request) {
        final Appointment appointment = getAppointmentDetails(request.getId());
        //if (!appointment.getConfirmed()) {
        //    throw new WrongDataException("You can add note only to confirmed appointment");
        //}
        appointment.setNote(request.getNote());
        appointmentRepository.save(appointment);
    }

    @Transactional
    public void cancelAppointment(final Long id) {
        final Appointment appointment = getAppointmentDetails(id);
        if (appointment.getConfirmed()) {
            throw new WrongDataException("Appointment is already confirmed");
        }
        appointment.setCancelled(true);
        appointmentRepository.save(appointment);
    }

    @Transactional
    public void deleteAppointment(final Long id) {
        final Appointment appointment = getAppointmentDetails(id);
        appointmentRepository.delete(appointment);
    }
}
