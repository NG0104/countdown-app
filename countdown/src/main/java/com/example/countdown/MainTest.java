package com.example.countdown;

import com.example.countdown.model.Event;
import com.example.countdown.service.CountdownService;

import java.time.LocalDateTime;

public class MainTest {
    public static void main(String[] args) {
        Event graduation = new Event(
                "卒業式",
                LocalDateTime.of(2026, 7, 15, 10, 0, 0)
        );
        CountdownService service = new CountdownService();

        String countdown = service.getCountdown(graduation);
        System.out.println(graduation.getName() + "まで: " + countdown);
    }
}
