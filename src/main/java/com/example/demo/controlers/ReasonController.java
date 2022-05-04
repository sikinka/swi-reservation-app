package com.example.demo.controlers;

import com.example.demo.repositories.ReasonRepository;
import com.example.demo.entities.ReasonEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ReasonController {

    @Autowired
    ReasonRepository repository;

    @GetMapping("/reasons")
    List<ReasonEntity> findAll() {
        return repository.findAll();
    }
}
