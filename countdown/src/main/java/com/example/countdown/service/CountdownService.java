package com.example.countdown.service;

import com.example.countdown.model.Event;

import java.time.Duration;
import java.time.LocalDateTime;

public class CountdownService {

    public String getCountdown(Event event) {
        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(now, event.getEventDate());

        long days = duration.toDays();
        long hours = duration.toHours() % 24;
        long minutes = duration.toMinutes() % 60;
        long seconds = duration.getSeconds() % 60;

        return String.format("%d日 %d時間 %d分 %d秒", days, hours, minutes, seconds);
    }
}
