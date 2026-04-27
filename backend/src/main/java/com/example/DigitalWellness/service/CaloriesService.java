package com.example.DigitalWellness.service;

import com.example.DigitalWellness.model.Activity;
import com.example.DigitalWellness.model.UsageEntry;
import com.example.DigitalWellness.model.WorkoutSet;
import com.example.DigitalWellness.repository.ActivityRepository;
import com.example.DigitalWellness.repository.UsageEntryRepository;
import com.example.DigitalWellness.repository.WorkoutSetRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaloriesService {

    private final ActivityRepository activityRepository;
    private final UsageEntryRepository usageEntryRepository;
    private final WorkoutSetRepository workoutSetRepository;

    public CaloriesService(ActivityRepository activityRepository,
            UsageEntryRepository usageEntryRepository,
            WorkoutSetRepository workoutSetRepository) {
        this.activityRepository = activityRepository;
        this.usageEntryRepository = usageEntryRepository;
        this.workoutSetRepository = workoutSetRepository;
    }

    @PostConstruct
    public void init() {
        if (activityRepository.count() == 0) {
            activityRepository.save(new Activity("Instagram", 5));
            activityRepository.save(new Activity("YouTube", 4));
            activityRepository.save(new Activity("Study", 2));
        }
    }

    public List<Activity> getActivities() {
        return activityRepository.findAll();
    }

    public int addUsageEntry(UsageEntry entry) {
        usageEntryRepository.save(entry);

        Optional<Activity> activityOpt = activityRepository.findByName(entry.getActivityName());
        if (activityOpt.isPresent()) {
            return entry.getMinutes() * activityOpt.get().getCaloriesPerMinute();
        }
        return 0;
    }

    public int getTotalCalories() {
        int consumed = usageEntryRepository.findAll().stream().mapToInt(entry -> {
            Optional<Activity> activityOpt = activityRepository.findByName(entry.getActivityName());
            return activityOpt.map(activity -> entry.getMinutes() * activity.getCaloriesPerMinute()).orElse(0);
        }).sum();

        int burned = workoutSetRepository.findAll().stream().mapToInt(WorkoutSet::getCaloriesBurned).sum();

        return consumed - burned;
    }

    public String getWarningMessage() {
        if (getTotalCalories() > 100) {
            return "Warning: You have exceeded the 100 digital calories limit!";
        }
        return "";
    }

    public List<UsageEntry> getUsageEntries() {
        return usageEntryRepository.findAll();
    }
}
