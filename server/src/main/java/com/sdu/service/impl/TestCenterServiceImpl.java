package com.sdu.service.impl;


import com.sdu.model.TestCenter;
import com.sdu.payload.testcenter.request.TestCenterRequestDTO;
import com.sdu.payload.testcenter.response.TestCenterResponseDTO;
import com.sdu.repository.TestCenterRepository;
import com.sdu.service.TestCenterService;
import com.sdu.util.TimeSlotScheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TestCenterServiceImpl implements TestCenterService {
    @Autowired
    private TestCenterRepository testCenterRepository;


    @Override
    public TestCenter createTestCenter(TestCenterRequestDTO testCenterRequestDTO) {

//        TestCenter testCenter = TestCenter.builder()
//                .address(testCenterRequestDTO.getAddress())
//                .name(testCenterRequestDTO.getName())
//                .city(testCenterRequestDTO.getCity()).build();



        return testCenterRepository.save(TestCenter.builder()
                .address(testCenterRequestDTO.getAddress())
                .name(testCenterRequestDTO.getName())
                .city(testCenterRequestDTO.getCity())
                        .state(testCenterRequestDTO.getState())
                        .zip(testCenterRequestDTO.getZip())
                .build());


    }

    @Override
    public TestCenter getTestCenterById(Long id) {
        return testCenterRepository.findById(id).orElse(null);
    }

    @Override
    public List<TestCenterResponseDTO> getAllTestCenters() {

        List<TestCenter> testCenters = testCenterRepository.findAll();
        return testCenters.stream().map(
                testCenter -> {
                    return TestCenterResponseDTO.builder()
                              .Id(testCenter.getId())
                           .address(testCenter.getAddress())
                           .name(testCenter.getName())
                           .city(testCenter.getCity()).build();
                }
        ).collect(Collectors.toList());
    }
    @Override
    public TestCenter updateTestCenter(Long id, TestCenter testCenter) {
        Optional<TestCenter> optionalTestCenter = testCenterRepository.findById(id);
        if (optionalTestCenter.isPresent()) {
            TestCenter existingTestCenter = optionalTestCenter.get();
            existingTestCenter.setName(testCenter.getName());
            existingTestCenter.setAddress(testCenter.getAddress());
            existingTestCenter.setCity(testCenter.getCity());
            existingTestCenter.setState(testCenter.getState());
            existingTestCenter.setZip(testCenter.getZip());
            return testCenterRepository.save(existingTestCenter);
        }
        return null;
    }

    @Override
    public void deleteTestCenter(Long id) {
        Optional<TestCenter> testCenterOptional = testCenterRepository.findById(id);
        if(testCenterOptional.isPresent()){
            testCenterRepository.delete(testCenterOptional.get());
        } else {
            // handle error when no test center found with given id
        }
    }

}