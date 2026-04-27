package com.example.DigitalWellness.service;

import com.example.DigitalWellness.model.Exercise;
import com.example.DigitalWellness.model.WorkoutSet;
import com.example.DigitalWellness.repository.ExerciseRepository;
import com.example.DigitalWellness.repository.WorkoutSetRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService {

    private final ExerciseRepository exerciseRepository;
    private final WorkoutSetRepository workoutSetRepository;

    public WorkoutService(ExerciseRepository exerciseRepository, WorkoutSetRepository workoutSetRepository) {
        this.exerciseRepository = exerciseRepository;
        this.workoutSetRepository = workoutSetRepository;
    }

    @PostConstruct
    public void init() {
        if (exerciseRepository.count() == 0) {
            exerciseRepository.save(new Exercise("Push-ups"));
            exerciseRepository.save(new Exercise("Squats"));
            exerciseRepository.save(new Exercise("Bench Press"));
            exerciseRepository.save(new Exercise("Pull-ups"));
        }
    }

    public List<Exercise> getExercises() {
        return exerciseRepository.findAll();
    }

    public WorkoutSet logWorkout(WorkoutSet workoutSet) {
        // Calculate burned calories arbitrarily
        int burned = (int) ((workoutSet.getWeight() > 0 ? workoutSet.getWeight() : 10) * workoutSet.getReps() / 10.0);
        if (burned < 1)
            burned = 1; // at least 1 cal per set

        workoutSet.setCaloriesBurned(burned);
        workoutSet.setTimestamp(java.time.LocalDateTime.now());

        return workoutSetRepository.save(workoutSet);
    }

    public List<WorkoutSet> getWorkoutHistory() {
        return workoutSetRepository.findAll();
    }
}
