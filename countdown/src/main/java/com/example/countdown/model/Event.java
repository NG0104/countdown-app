package com.example.countdown.model;

import java.time.LocalDateTime;

public class Event {
    private String name;
    private LocalDateTime startDate;  // STEP8対応
    private LocalDateTime eventDate;

    // 既存の2引数コンストラクタ（後方互換）
    public Event(String name, LocalDateTime eventDate) {
        this.name = name;
        this.eventDate = eventDate;
        this.startDate = null;
    }

    // 3引数コンストラクタ（開始日 + 終了日）
    public Event(String name, LocalDateTime startDate, LocalDateTime eventDate) {
        this.name = name;
        this.startDate = startDate;
        this.eventDate = eventDate;
    }

    // getter / setter
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public LocalDateTime getStartDate() { return startDate; }
    public void setStartDate(LocalDateTime startDate) { this.startDate = startDate; }

    public LocalDateTime getEventDate() { return eventDate; }
    public void setEventDate(LocalDateTime eventDate) { this.eventDate = eventDate; }
}
