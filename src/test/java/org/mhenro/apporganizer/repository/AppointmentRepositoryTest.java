package org.mhenro.apporganizer.repository;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mhenro.apporganizer.model.entity.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Page;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class AppointmentRepositoryTest {
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Test
    public void findAppointments() throws Exception {
        init();
        Page<Appointment> appointments = appointmentRepository.findAppointments(null);
        Assert.assertEquals(2, appointments.getTotalElements());
        Assert.assertEquals("Test note", appointments.getContent().get(0).getNote());
        Assert.assertEquals("New note", appointments.getContent().get(1).getNote());
    }

    private void init() {
        createAppointment("Test note");
        createAppointment("New note");
        entityManager.flush();
    }

    private Appointment createAppointment(final String note) {
        final Appointment appointment = new Appointment();
        appointment.setNote(note);
        entityManager.persist(appointment);
        return appointment;
    }
}
