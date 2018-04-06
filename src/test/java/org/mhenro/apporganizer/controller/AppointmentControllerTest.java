package org.mhenro.apporganizer.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mhenro.apporganizer.model.entity.Appointment;
import org.mhenro.apporganizer.model.exception.ObjectNotFoundException;
import org.mhenro.apporganizer.model.request.AppointmentRequest;
import org.mhenro.apporganizer.service.AppointmentService;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import static org.hamcrest.core.Is.is;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@RunWith(SpringRunner.class)
public class AppointmentControllerTest {
    @Mock
    private AppointmentService appointmentService;

    @InjectMocks
    private AppointmentController appointmentController;

    private MockMvc mvc;

    private ObjectMapper mapper = new ObjectMapper();

    @Before
    public void setup() {
        mvc = MockMvcBuilders
                .standaloneSetup(appointmentController)
                .setCustomArgumentResolvers(new PageableHandlerMethodArgumentResolver())
                .setViewResolvers((viewName, locale) -> new MappingJackson2JsonView())
                .build();
    }

    @Test
    public void getAppointments() throws Exception {
        final Pageable pageable = Mockito.mock(Pageable.class);
        final Page<Appointment> appointments = Mockito.mock(Page.class);
        when(appointmentService.getAppointments(pageable)).thenReturn(appointments);
        mvc.perform(get("/appointments")).andExpect(status().isOk());
    }

    @Test
    public void getAppointmentDetailsOk() throws Exception {
        final Appointment appointment = new Appointment();
        appointment.setId(500l);
        appointment.setNote("Test note");
        when(appointmentService.getAppointmentDetails(appointment.getId())).thenReturn(appointment);
        mvc.perform(get("/appointments/500")).andExpect(status().isOk()).andExpect(jsonPath("message.note", is("Test note")));
    }

    @Test
    public void getAppointmentDetailsNotFound() throws Exception {
        when(appointmentService.getAppointmentDetails(any())).thenThrow(new ObjectNotFoundException("Appointment is not found"));
        mvc.perform(get("/appointments/500")).andExpect(status().isBadRequest()).andExpect(content().string("{\"message\":\"Appointment is not found\"}"));
    }

    @Test
    public void saveAppointment() throws Exception {
        final AppointmentRequest request = new AppointmentRequest();
        request.setAppId(20l);
        request.setCompanyId(300l);
        //request.setDate(LocalDate.of(2018, 04, 05));
        //request.setTime(LocalTime.of(11, 23, 59));
        final String json = mapper.writeValueAsString(request);
        mvc.perform(post("/appointments").content(json).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(content().string("{\"message\":\"Appointment was saved successfully\"}"));
    }
}
