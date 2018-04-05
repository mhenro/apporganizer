package org.mhenro.apporganizer.model.request;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Created by mhenr on 04.04.2018.
 */
public class AppointmentRequest {
    private Long appId;
    private LocalDate date;
    private LocalTime time;
    private Long companyId;

    public Long getAppId() {
        return appId;
    }

    public void setAppId(Long appId) {
        this.appId = appId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }
}
