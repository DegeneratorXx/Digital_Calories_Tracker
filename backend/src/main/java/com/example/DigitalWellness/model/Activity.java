package com.example.DigitalWellness.model;

public class Activity {
    private String name;
    private int caloriesPerMinute;

    public Activity() {}

    public Activity(String name, int caloriesPerMinute) {
        this.name = name;
        this.caloriesPerMinute = caloriesPerMinute;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCaloriesPerMinute() {
        return caloriesPerMinute;
    }

    public void setCaloriesPerMinute(int caloriesPerMinute) {
        this.caloriesPerMinute = caloriesPerMinute;
    }
}
