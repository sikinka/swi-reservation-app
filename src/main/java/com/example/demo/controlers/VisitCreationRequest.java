package com.example.demo.controlers;

import com.example.demo.entities.PersonEntity;
import com.example.demo.entities.ReasonEntity;
import com.example.demo.entities.VisitEntity;

public class VisitCreationRequest {

    private PersonEntity person;
    private ReasonEntity reason;
    private VisitEntity  visit;

    public VisitCreationRequest(PersonEntity person, ReasonEntity reason, VisitEntity visit) {
        this.person = person;
        this.reason = reason;
        this.visit = visit;

        //visit.setBookingDate(java.sql.Timestamp.valueOf("2020-09-23 10:10:10.0"));
    }

    public PersonEntity getPerson() {
        return person;
    }

    public void setPerson(PersonEntity person) {
        this.person = person;
    }

    public ReasonEntity getReason() {
        return reason;
    }

    public void setReason(ReasonEntity reason) {
        this.reason = reason;
    }

    public VisitEntity getVisit() {
        return visit;
    }

    public void setVisit(VisitEntity visit) {
        this.visit = visit;
    }
}
