package org.mhenro.apporganizer.service;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mhenro.apporganizer.model.entity.Appointment;
import org.mhenro.apporganizer.model.exception.ObjectNotFoundException;
import org.mhenro.apporganizer.model.exception.WrongDataException;
import org.mhenro.apporganizer.model.request.AppointmentRequest;
import org.mhenro.apporganizer.repository.AppointmentRepository;
import org.mhenro.apporganizer.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
public class AppointmentServiceTest {
    @TestConfiguration
    static class ServiceConfiguration {
        @MockBean
        private AppointmentRepository appointmentRepository;
        @MockBean
        private CompanyRepository companyRepository;

        @Bean
        public AppointmentService appointmentService() {
            return new AppointmentService(appointmentRepository, companyRepository);
        }
    }

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AppointmentService appointmentService;

    @Before
    public void init() {
        List<Appointment> appointments = generateAppointments(2);
        final Page<Appointment> page = new PageImpl<>(appointments);
        when(appointmentRepository.findAppointments(null)).thenReturn(page);
        when(appointmentRepository.findById(45l)).thenReturn(Optional.of(createAppointment(45, false)));
        when(appointmentRepository.findById(55l)).thenReturn(Optional.of(createAppointment(55, true)));
    }

    @Test
    public void getAppointments() throws Exception {
        Page<Appointment> appointments = appointmentService.getAppointments(null);
        Assert.assertEquals(2, appointments.getTotalElements());
        Assert.assertEquals(0, (long)appointments.getContent().get(0).getId());
        Assert.assertEquals(1, (long)appointments.getContent().get(1).getId());
    }

    @Test
    public void getAppointmentDetails() throws Exception {
        Appointment appointment = appointmentService.getAppointmentDetails(45l);
        Assert.assertNotNull(appointment);
        Assert.assertEquals(45, (long)appointment.getId());
    }

    @Test(expected = ObjectNotFoundException.class)
    public void getAppointmentDetailsNotFound() throws Exception {
        Appointment appointment = appointmentService.getAppointmentDetails(23l);
    }

    @Test(expected = Test.None.class)
    public void saveAppointment() throws Exception {
        final AppointmentRequest request = new AppointmentRequest();
        request.setTime(LocalTime.now());
        request.setDate(LocalDate.now());
        request.setAppId(45l);
        request.setCompanyId(2l);
        appointmentService.saveAppointment(request);
    }

    @Test(expected = Test.None.class)
    public void confirmAppointment() throws Exception {
        appointmentService.confirmAppointment(45l);
    }

    @Test(expected = ObjectNotFoundException.class)
    public void confirmAppointmentNotFound() throws Exception {
        appointmentService.confirmAppointment(75l);
    }

    @Test(expected = WrongDataException.class)
    public void confirmAppointmentAlreadyCancelled() throws Exception {
        appointmentService.confirmAppointment(55l);
    }

    @Test(expected = Test.None.class)
    public void deleteAppointment() throws Exception {
        appointmentService.deleteAppointment(45l);
    }

    @Test(expected = ObjectNotFoundException.class)
    public void deleteAppointmentNotFound() throws Exception {
        appointmentService.deleteAppointment(154l);
    }

    private List<Appointment> generateAppointments(final int count) {
        return IntStream.range(0, count).mapToObj(i -> createAppointment(i, false)).collect(Collectors.toList());
    }

    private Appointment createAppointment(final int i, final boolean cancelled) {
        Appointment appointment = new Appointment();
        appointment.setId((long)i);
        appointment.setCancelled(cancelled);
        return appointment;
    }
}
