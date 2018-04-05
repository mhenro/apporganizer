package org.mhenro.apporganizer.service;

import org.mhenro.apporganizer.model.entity.Appointment;
import org.mhenro.apporganizer.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class ExportService {
    private AppointmentRepository appointmentRepository;
    private static final String csvFileName = "appointments.csv";

    @Autowired
    public ExportService(final AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public void download(final HttpServletResponse response) throws IOException {
        prepareResponse(response);
        final List<Appointment> appointments = appointmentRepository.findAll();

        try(final ICsvBeanWriter writer = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE)) {
            final String[] header = {"ID", "Confirmed", "Cancelled", "Note", "Date", "Time", "Company"};
            writer.writeHeader(header);
            for (final Appointment app : appointments) {
                writer.write(app, header);
            }
        }
    }

    private void prepareResponse(final HttpServletResponse response) {
        response.setContentType("text/csv");
        final String headerKey = "Content-Disposition";
        final String headerValue = String.format("attachment; filename=\"%s\"", csvFileName);
        response.setHeader(headerKey, headerValue);
    }
}
