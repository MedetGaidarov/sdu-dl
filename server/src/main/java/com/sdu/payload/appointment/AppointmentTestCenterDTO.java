package com.sdu.payload.appointment;

import com.sdu.model.TestCenter;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AppointmentTestCenterDTO {
    private String appointmentTime;
    private String appointmentDate;

    private Long testCenterId;
    private String testCenterName;
    private String testCenterAddress;
    private Long appointmentId;



}
