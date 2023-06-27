package com.sdu.util;


import java.time.LocalDate;
import java.util.List;

import com.sdu.service.TestCenterTimeSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.sdu.model.TestCenter;
import com.sdu.repository.TestCenterRepository;

import javax.annotation.PostConstruct;

@Component
public class TimeSlotScheduler {
    @Autowired
    private TestCenterTimeSlotService timeSlotService;

    @Autowired
    private TestCenterRepository testCenterRepository;


    @PostConstruct
    @Scheduled(cron = "0 0 0 */10 * ?") // Run every 10 days at midnight
    public void generateTimeSlotsForNextTenDays() {
        List<TestCenter> testCenters = testCenterRepository.findAll();

        for (int dayOffset = 1; dayOffset <= 10; dayOffset++) {
            LocalDate newDay = LocalDate.now().plusDays(dayOffset); // Get the date for the next day
            
            for (TestCenter testCenter : testCenters) {
                timeSlotService.createTimeSlotsForTestCenter(testCenter, newDay, 27);
            }
        }
    }


}