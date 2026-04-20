package com.example.DigitalWellness.controller;

import com.example.DigitalWellness.model.Activity;
import com.example.DigitalWellness.model.UsageEntry;
import com.example.DigitalWellness.service.CaloriesService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allows React frontend to communicate bypassing CORS issues
public class CaloriesController {

    private final CaloriesService caloriesService;

    public CaloriesController(CaloriesService caloriesService) {
        this.caloriesService = caloriesService;
    }

    /**
     * Endpoint: POST /api/usage
     * Action: Add a usage entry, return calculated calories
     */
    @PostMapping("/usage")
    public Map<String, Integer> addUsage(@RequestBody UsageEntry entry) {
        int calories = caloriesService.addUsageEntry(entry);
        Map<String, Integer> response = new HashMap<>();
        response.put("caloriesAdded", calories);
        return response;
    }

    /**
     * Endpoint: GET /api/usage
     * Action: Return list of all recorded usage entries
     */
    @GetMapping("/usage")
    public List<UsageEntry> getUsageHistory() {
        return caloriesService.getUsageEntries();
    }

    /**
     * Endpoint: GET /api/total
     * Action: Return total digital calories consumed
     */
    @GetMapping("/total")
    public Map<String, Integer> getTotalCalories() {
        Map<String, Integer> response = new HashMap<>();
        response.put("totalCalories", caloriesService.getTotalCalories());
        return response;
    }

    /**
     * Endpoint: GET /api/activities
     * Action: Return list of predefined activities
     */
    @GetMapping("/activities")
    public List<Activity> getActivities() {
        return caloriesService.getActivities();
    }

    /**
     * Endpoint: GET /api/warning
     * Action: Return warning message if total > 100 calories
     */
    @GetMapping("/warning")
    public Map<String, String> getWarning() {
        Map<String, String> response = new HashMap<>();
        response.put("warning", caloriesService.getWarningMessage());
        return response;
    }
}
