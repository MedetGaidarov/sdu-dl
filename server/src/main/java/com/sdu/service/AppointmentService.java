package com.sdu.service;

import com.sdu.model.Appointment;
import com.sdu.payload.appointment.AppointmentRequestDTO;
import com.sdu.payload.appointment.AppointmentTestCenterDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface AppointmentService {
    Appointment createAppointment(AppointmentRequestDTO appointmentRequestDTO);
    Appointment getAppointmentById(Long id);
    Page<Appointment> getAllAppointments(Pageable pageable);
    Appointment updateAppointment(Long id, Appointment appointment);

    void sendConfirmationEmail(Appointment appointment);

    void confirmAppointment(Long appointmentId) throws Exception;
    void cancelAppointment(Long id);
//    todo : appointment find by email
//    todo: findByTestCenterId
   List<AppointmentTestCenterDTO> getAppointmentsByTestCenterId(Long testCenterId);
}
