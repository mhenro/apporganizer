package org.mhenro.apporganizer.model.response;

import org.mhenro.apporganizer.model.entity.Company;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Created by mhenr on 04.04.2018.
 */
public class AppointmentResponse {
    private Long id;
    private Boolean confirmed;
    private Boolean cancelled;
    private String note;
    private LocalDate date;
    private LocalTime time;
    private Company company;
}
