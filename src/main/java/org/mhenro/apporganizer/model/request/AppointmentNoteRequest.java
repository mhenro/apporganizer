package org.mhenro.apporganizer.model.request;

/**
 * Created by mhenr on 04.04.2018.
 */
public class AppointmentNoteRequest {
    private Long id;
    private String note;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
