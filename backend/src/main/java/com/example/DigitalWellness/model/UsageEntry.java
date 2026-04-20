package com.example.DigitalWellness.model;

public class UsageEntry {
    private String activityName;
    private int minutes;

    public UsageEntry() {}

    public UsageEntry(String activityName, int minutes) {
        this.activityName = activityName;
        this.minutes = minutes;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public int getMinutes() {
        return minutes;
    }

    public void setMinutes(int minutes) {
        this.minutes = minutes;
    }
}
