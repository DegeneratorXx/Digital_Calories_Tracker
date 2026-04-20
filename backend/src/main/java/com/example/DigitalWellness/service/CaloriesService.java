package com.example.DigitalWellness.service;

import com.example.DigitalWellness.model.Activity;
import com.example.DigitalWellness.model.UsageEntry;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CaloriesService {

    // Predefined activities stored in a Hashmap
    private final Map<String, Activity> activityMap;
    
    // In-memory list to store all usage entries
    private final List<UsageEntry> usageEntries;
    
    // Running total of digital calories
    private int totalCalories;

    public CaloriesService() {
        this.activityMap = new HashMap<>();
        this.usageEntries = new ArrayList<>();
        this.totalCalories = 0;

        // Initialize predefined activities according to requirements
        activityMap.put("Instagram", new Activity("Instagram", 5));
        activityMap.put("YouTube", new Activity("YouTube", 4));
        activityMap.put("Study", new Activity("Study", 2));
    }

    /**
     * Retrieve all predefined activities.
     */
    public List<Activity> getActivities() {
        return new ArrayList<>(activityMap.values());
    }

    /**
     * Add a usage entry and update running total.
     * Calculated calories: minutes * caloriesPerMinute
     */
    public int addUsageEntry(UsageEntry entry) {
        usageEntries.add(entry);
        int caloriesForEntry = 0;
        
        // Find the activity and calculate its calorie impact
        Activity activity = activityMap.get(entry.getActivityName());
        if (activity != null) {
            caloriesForEntry = entry.getMinutes() * activity.getCaloriesPerMinute();
            totalCalories += caloriesForEntry;
        }
        
        return caloriesForEntry;
    }

    /**
     * Get the total digital calories consumed.
     */
    public int getTotalCalories() {
        return totalCalories;
    }

    /**
     * Return a warning message if the total exceeds 100 calories.
     */
    public String getWarningMessage() {
        if (totalCalories > 100) {
            return "Warning: You have exceeded the 100 digital calories limit!";
        }
        return "";
    }

    /**
     * Get all recorded usage entries.
     */
    public List<UsageEntry> getUsageEntries() {
        return usageEntries;
    }
}
