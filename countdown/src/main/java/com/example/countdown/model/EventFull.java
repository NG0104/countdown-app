package com.example.countdown.model;

import java.time.LocalDateTime;

public class EventFull {

    private int id;
    private String name;
    private String startDate;
    private String eventDate;

    public EventFull(int id, String name, LocalDateTime startDate, LocalDateTime eventDate) {
        this.id = id;
        this.name = name;
        this.startDate = startDate.toString();
        this.eventDate = eventDate.toString();
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public String getStartDate() { return startDate; }
    public String getEventDate() { return eventDate; }
}
