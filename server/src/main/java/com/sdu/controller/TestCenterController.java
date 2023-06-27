package com.sdu.controller;


import com.sdu.model.TestCenter;
import com.sdu.payload.testcenter.request.TestCenterRequestDTO;
import com.sdu.payload.testcenter.response.TestCenterResponseDTO;
import com.sdu.service.TestCenterService;
import com.sdu.util.TimeSlotScheduler;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/testcenters")
public class TestCenterController {
    @Autowired
    private TestCenterService testCenterService;


    @Autowired
    private TimeSlotScheduler timeSlotScheduler;
    @PostMapping
    public ResponseEntity<TestCenter> createTestCenter(@RequestBody TestCenterRequestDTO testCenterRequestDTO) {
        return new ResponseEntity<>(testCenterService.createTestCenter(testCenterRequestDTO), HttpStatus.CREATED);
    }

    @GetMapping ("/generate-time-slots")
    public ResponseEntity<?>  generateTimeSlots() {
        timeSlotScheduler.generateTimeSlotsForNextTenDays();
        return ResponseEntity.ok("Maybe normal: )) ");
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestCenter> getTestCenterById(@PathVariable Long id) {
        TestCenter testCenter = testCenterService.getTestCenterById(id);
        if (testCenter != null) {
            return new ResponseEntity<>(testCenter, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<List<TestCenterResponseDTO>> getAllTestCenters(){
        List<TestCenterResponseDTO> testCenters = testCenterService.getAllTestCenters();
        return new ResponseEntity<>(testCenters, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestCenter> updateTestCenter(@PathVariable Long id, @RequestBody TestCenter testCenter) {
        TestCenter updatedTestCenter = testCenterService.updateTestCenter(id, testCenter);
        if (updatedTestCenter != null) {
            return new ResponseEntity<>(updatedTestCenter, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestCenter(@PathVariable Long id) {
        testCenterService.deleteTestCenter(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}
