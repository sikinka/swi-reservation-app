package com.example.demo.controlers;

import com.example.demo.repositories.VisitRepository;
import com.example.demo.entities.VisitEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.rmi.ServerException;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class VisitController {

    @Autowired
    VisitRepository repository;

    @GetMapping("/visits")
    List<VisitEntity> findAll() {
        return repository.findAll();

    }

    @GetMapping("/visits/withParamWithHour")
        // vrati vsechny blocked visity v dany den v danou hodinu
    ResponseEntity<VisitEntity> findBlockedVisitsInDayWithHour(@RequestParam int year, @RequestParam int month, @RequestParam int day, @RequestParam String hour) {

        return new ResponseEntity<VisitEntity>(repository.findVisitInTime(year, month, day, java.sql.Time.valueOf(hour)), HttpStatus.OK);
    }

    @GetMapping("/visits/withParamWithoutHour")
        // vrati vsechny blocked visity v dany den
    List<VisitEntity> findBlockedVisitsInDay(@RequestParam int year, @RequestParam int month, @RequestParam int day) {
        return repository.findVisitInDate(year, month, day);
    }

    @PostMapping("visits/create")
    public ResponseEntity<VisitEntity> createNewRecordVisit(@RequestBody VisitCreationRequest newVisit) throws ServerException {
        VisitEntity visit = newVisit.getVisit();
        visit.setPersonByPersonIdPerson(newVisit.getPerson());
        visit.setReasonByReasonCodeReason(newVisit.getReason());

        VisitEntity visitEntityTime = repository.findVisitInTime(visit.getYear(), visit.getMonth(), visit.getDay(), visit.getHour());
        if (visitEntityTime != null) {
            throw new ServerException("Rezervace v dany čas již existuje!");
        }
        VisitEntity visitRet = null;
        try {
            visitRet = repository.save(visit);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            throw new ServerException("Nepodařilo se vytvořit návštěvu", ex);
        }

        return new ResponseEntity<>(visitRet, HttpStatus.CREATED);

    }

    /*@PutMapping("/persons/{id}")
    ResponseEntity<String> createOrUpdate(@Valid @RequestBody PersonEntity newPerson, @PathVariable Long id) {
        PersonEntity person = repository.findById(id)
                .map(x -> {
                    x.setName(newPerson.getName());
                    x.setLastName(newPerson.getLastName());
                    x.setPhone(newPerson.getPhone());
                    x.setInsuranceCode(newPerson.getInsuranceCode());
                    x.setEmail(newPerson.getEmail());
                    return repository.save(x);
                })
                .orElseGet(() -> {
                    return repository.save(newPerson);
                });*/
}
