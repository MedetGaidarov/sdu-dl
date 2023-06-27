package com.sdu.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import java.util.List;

import javax.persistence.*;


@Entity
@Table(name = "test_centers")

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder

public class TestCenter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String city;

    @OneToMany(mappedBy = "testCenter", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<TestCenterTimeSlot> timeSlots;
    @Column(nullable = false)
    private String state;
    @Column(nullable = false)

    private String zip;

    @OneToMany(mappedBy = "testCenter", cascade = CascadeType.ALL)
    private List<Appointment> appointments;


}
