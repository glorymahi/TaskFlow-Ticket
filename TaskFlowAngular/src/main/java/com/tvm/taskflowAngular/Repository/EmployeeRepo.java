package com.tvm.taskflowAngular.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tvm.taskflowAngular.model.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Integer>{

	public List<Employee> findByfirstName(String name);
}
