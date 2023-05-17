package com.sdu.service.impl;


import com.sdu.model.Appointment;
import com.sdu.model.AppointmentStatus;
import com.sdu.model.TestCenter;
import com.sdu.model.TestCenterTimeSlot;
import com.sdu.payload.appointment.AppointmentRequestDTO;
import com.sdu.payload.appointment.AppointmentTestCenterDTO;
import com.sdu.repository.AppointmentRepository;
import com.sdu.repository.TestCenterRepository;
import com.sdu.repository.TestCenterTimeSlotRepository;
import com.sdu.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class AppointmentServiceImpl implements AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TestCenterTimeSlotRepository testCenterTimeSlotRepository;

    @Autowired
    private TestCenterRepository testCenterRepository;
    @Override
    public Appointment createAppointment(AppointmentRequestDTO appointmentRequestDTO) {
        TestCenterTimeSlot timeSlot = testCenterTimeSlotRepository.findById(appointmentRequestDTO.getTimeSlotId()).orElseThrow();
        timeSlot.setBooked(true);
        TestCenter testCenter = testCenterRepository.findById(timeSlot.getTestCenter().getId()).orElseThrow();
        return appointmentRepository.save(Appointment.builder()
                        .timeSlot(timeSlot)
                        .email(appointmentRequestDTO.getEmail())
                        .name(appointmentRequestDTO.getName())
                        .status(AppointmentStatus.WAITING_FOR_CONFIRMATION)
                        .testCenter(testCenter)
                        .build()

                );
    }

    @Override
    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id).orElse(null);
    }

    @Override
    public Page<Appointment> getAllAppointments(Pageable pageable) {
        return appointmentRepository.findAll(pageable);
    }



    @Override
    public Appointment updateAppointment(Long id, Appointment appointment) {
        Optional<Appointment> optionalAppointment = appointmentRepository.findById(id);
        if (optionalAppointment.isPresent()) {
            Appointment existingAppointment = optionalAppointment.get();
            existingAppointment.setTimeSlot(appointment.getTimeSlot());
            existingAppointment.setStatus(appointment.getStatus());
            return appointmentRepository.save(existingAppointment);
        }
        return null;
    }

    @Override
    public void sendConfirmationEmail(Appointment appointment) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(appointment.getEmail());
        message.setSubject("Appointment Confirmation");
        String confirmationUrl = "http://localhost:8080/api/appointments/confirm?appointmentId=" + appointment.getId();
        message.setText("Please confirm your appointment by clicking on the following link: " + confirmationUrl);
        mailSender.send(message);
    }

    @Override
    public void cancelAppointment(Long id) {
        Optional<Appointment> optionalAppointment = appointmentRepository.findById(id);
        if (optionalAppointment.isPresent()) {
            Appointment existingAppointment = optionalAppointment.get();
            existingAppointment.setStatus(AppointmentStatus.CANCELED);
            appointmentRepository.save(existingAppointment);
        }
    }


    public void confirmAppointment(Long appointmentId) throws Exception {
        Optional<Appointment> optionalAppointment = appointmentRepository.findById(appointmentId);
        if (optionalAppointment.isPresent()) {
            Appointment appointment = optionalAppointment.get();
            appointment.setStatus(AppointmentStatus.SCHEDULED);
            appointmentRepository.save(appointment);
        } else {
            throw new Exception("Appointment not found.");
        }
    }
    public List<AppointmentTestCenterDTO> getAppointmentsByTestCenterId(Long testCenterId) {

        List<Appointment> appointments = appointmentRepository.findByTestCenterId(testCenterId);
        return appointments.stream().map(this::convertToDTO).collect(Collectors.toList());

    }
    public AppointmentTestCenterDTO convertToDTO(Appointment appointment) {
        AppointmentTestCenterDTO dto = new AppointmentTestCenterDTO();
        dto.setAppointmentId(appointment.getId());
        dto.setAppointmentDate(appointment.getTimeSlot().getDate().toString());
        dto.setAppointmentTime(appointment.getTimeSlot().getTime().toString());
        dto.setTestCenterId(appointment.getTestCenter().getId());
        dto.setTestCenterName(appointment.getTestCenter().getName());
        dto.setTestCenterAddress(appointment.getTestCenter().getAddress());
        return dto;
    }
}
