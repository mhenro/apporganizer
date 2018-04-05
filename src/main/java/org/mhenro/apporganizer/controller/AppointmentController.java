package org.mhenro.apporganizer.controller;

import org.mhenro.apporganizer.model.Response;
import org.mhenro.apporganizer.model.entity.Appointment;
import org.mhenro.apporganizer.model.exception.ObjectNotFoundException;
import org.mhenro.apporganizer.model.exception.WrongDataException;
import org.mhenro.apporganizer.model.request.AppointmentNoteRequest;
import org.mhenro.apporganizer.model.request.AppointmentRequest;
import org.mhenro.apporganizer.service.AppointmentService;
import org.mhenro.apporganizer.util.ControllerHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class AppointmentController {
    private AppointmentService appointmentService;

    @Autowired
    public AppointmentController(final AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @RequestMapping(value = "appointments", method = RequestMethod.GET)
    public Page<Appointment> getAppointments(final Pageable pageable) {
        return appointmentService.getAppointments(pageable);
    }

    @RequestMapping(value = "appointments/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getAppointmentDetails(@PathVariable final Long id) {
        return Response.createResponseEntity(appointmentService.getAppointmentDetails(id), HttpStatus.OK);
    }

    @RequestMapping(value = "appointments", method = RequestMethod.POST)
    public ResponseEntity<?> saveAppointment(@RequestBody final AppointmentRequest request) {
        appointmentService.saveAppointment(request);
        return Response.createResponseEntity("Appointment was saved successfully", HttpStatus.OK);
    }

    @RequestMapping(value = "appointments/{id}/confirm", method = RequestMethod.GET)
    public ResponseEntity<?> confirmAppointment(@PathVariable final Long id) {
        appointmentService.confirmAppointment(id);
        return Response.createResponseEntity("Appointment was confirmed successfully", HttpStatus.OK);
    }

    @RequestMapping(value = "appointments/note", method = RequestMethod.POST)
    public ResponseEntity<?> addNoteToAppointment(@RequestBody final AppointmentNoteRequest request) {
        appointmentService.addNoteToAppointment(request);
        return Response.createResponseEntity("The note was added successfully to the appointment", HttpStatus.OK);
    }

    @RequestMapping(value = "appointments/{id}/cancel", method = RequestMethod.GET)
    public ResponseEntity<?> cancelAppointment(@PathVariable final Long id) {
        appointmentService.cancelAppointment(id);
        return Response.createResponseEntity("Appointment was cancelled successfully", HttpStatus.OK);
    }

    @RequestMapping(value = "appointments/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteAppointment(@PathVariable final Long id) {
        appointmentService.deleteAppointment(id);
        return Response.createResponseEntity("Appointment was deleted successfully", HttpStatus.OK);
    }

    /* ----------------------------------------exception handlers------------------------------------------------ */

    @ExceptionHandler(ObjectNotFoundException.class)
    public ResponseEntity<?> objectNotFound(ObjectNotFoundException e) {
        return Response.createResponseEntity(ControllerHelper.getErrorOrDefaultMessage(e, "Object is not found"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(WrongDataException.class)
    public ResponseEntity<?> wrongData(WrongDataException e) {
        return Response.createResponseEntity(ControllerHelper.getErrorOrDefaultMessage(e, "Bad request"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UnsupportedOperationException.class)
    public ResponseEntity<?> unsupportedOperationException(UnsupportedOperationException e) {
        return Response.createResponseEntity(ControllerHelper.getErrorOrDefaultMessage(e, "Method is not supported"), HttpStatus.BAD_REQUEST);
    }
}
