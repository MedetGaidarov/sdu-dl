package com.sdu.controller;


import com.sdu.model.Appointment;
import com.sdu.payload.appointment.AppointmentRequestDTO;
import com.sdu.payload.appointment.AppointmentTestCenterDTO;
import com.sdu.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody AppointmentRequestDTO appointmentRequestDTO) {
        Appointment appointment = appointmentService.createAppointment(appointmentRequestDTO);
        appointmentService.sendConfirmationEmail(appointment);
        return new ResponseEntity<>(appointment, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        Appointment appointment = appointmentService.getAppointmentById(id);
        if (appointment != null) {
            return new ResponseEntity<>(appointment, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<Page<Appointment>> getAllAppointments(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sort", defaultValue = "ASC") Sort.Direction sortDirection,
            @RequestParam(value = "sortBy", defaultValue = "id") String sortBy) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        Page<Appointment> appointments = appointmentService.getAllAppointments(pageRequest);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id, @RequestBody Appointment appointment) {
        Appointment updatedAppointment = appointmentService.updateAppointment(id, appointment);
        if (updatedAppointment != null) {
            return new ResponseEntity<>(updatedAppointment, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelAppointment(@PathVariable Long id) {
        appointmentService.cancelAppointment(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/confirm")
    public ResponseEntity<String> confirmAppointment(@RequestParam("appointmentId") Long appointmentId) {
        try {
            appointmentService.confirmAppointment(appointmentId);
            return ResponseEntity.ok("Appointment confirmed successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error confirming the appointment.");
        }
    }

    @GetMapping("/appointments")
    public List<AppointmentTestCenterDTO> getAppointmentsByTestCenterId(@RequestParam Long testCenterId) {
        return appointmentService.getAppointmentsByTestCenterId(testCenterId);
    }
}
