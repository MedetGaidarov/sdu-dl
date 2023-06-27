package com.sdu.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class TestCenterTimeSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private LocalTime time;

    @ManyToOne
    @JoinColumn(name = "test_center_id", nullable = false)
    @JsonBackReference
    private TestCenter testCenter;

    private Boolean booked;

    @OneToMany(mappedBy = "timeSlot", cascade = CascadeType.ALL)
    private List<Appointment> appointments;


}
