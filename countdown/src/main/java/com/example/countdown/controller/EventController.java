package com.example.countdown.controller;

import com.example.countdown.model.Event;
import com.example.countdown.model.EventFull;
import com.example.countdown.service.CountdownService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class EventController {

    private final CountdownService countdownService = new CountdownService();

    // 単一イベント取得（参考）
    @GetMapping("/api/event")
    public Event getEvent() {
        return new Event(
                "卒業式",
                LocalDateTime.of(2026, 8, 15, 10, 0, 0)
        );
    }

    // カウントダウン文字列
    @GetMapping("/api/countdown")
    public String getCountdown() {
        Event event = new Event(
                "卒業式",
                LocalDateTime.of(2026, 8, 15, 10, 0, 0)
        );
        return countdownService.getCountdown(event);
    }

    // 単一イベント（フロント互換）
    @GetMapping("/api/event/full")
    public EventFull getEventFull() {
        return new EventFull(
                1,
                "社会人開始まで",
                LocalDateTime.of(2004, 1, 4, 0, 0),
                LocalDateTime.of(2026, 4, 1, 0, 0)
        );
    }

    // 複数イベント取得
    @GetMapping("/api/events")
    public List<EventFull> getEvents() {
        return List.of(
                new EventFull(
                        1,
                        "生まれてから社会人開始まで",
                        LocalDateTime.of(2004, 1, 4, 0, 0),
                        LocalDateTime.of(2026, 4, 1, 0, 0)
                ),
                new EventFull(
                        2,
                        "大学入学から卒業式",
                        LocalDateTime.of(2022, 4, 1, 0, 0),
                        LocalDateTime.of(2026, 3, 25, 10, 0)
                ),
                new EventFull(
                        3,
                        "卒業論文要旨提出",
                        LocalDateTime.of(2025, 4, 1, 0, 0),
                        LocalDateTime.of(2026, 1, 31, 23, 59)
                )
        );
    }
}
