package com.sdu.service;


import com.sdu.model.TestCenter;

import java.util.List;

public interface TestCenterService {
    TestCenter createTestCenter(TestCenter testCenter);
    TestCenter getTestCenterById(Long id);
    List<TestCenter> getAllTestCenters();
    TestCenter updateTestCenter(Long id, TestCenter testCenter);
    void deleteTestCenter(Long id);
}