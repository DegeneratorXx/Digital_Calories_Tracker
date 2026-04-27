package com.example.DigitalWellness.controller;

import com.example.DigitalWellness.model.Exercise;
import com.example.DigitalWellness.model.WorkoutSet;
import com.example.DigitalWellness.service.WorkoutService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@CrossOrigin(origins = "*") // Allows React frontend to communicate bypassing CORS issues
public class WorkoutController {

    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @GetMapping("/exercises")
    public List<Exercise> getExercises() {
        return workoutService.getExercises();
    }

    @PostMapping
    public WorkoutSet logWorkoutSet(@RequestBody WorkoutSet workoutSet) {
        return workoutService.logWorkout(workoutSet);
    }

    @GetMapping("/history")
    public List<WorkoutSet> getWorkoutHistory() {
        return workoutService.getWorkoutHistory();
    }
}
