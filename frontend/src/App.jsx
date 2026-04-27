import { useState, useEffect } from 'react';

function App() {
  const [currentTab, setCurrentTab] = useState('digital'); // 'digital' or 'workout'

  // Digital Calories States
  const [activities, setActivities] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [warningMessage, setWarningMessage] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [minutes, setMinutes] = useState("");
  const [history, setHistory] = useState([]);

  // Workout Tracker States
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [workoutHistory, setWorkoutHistory] = useState([]);

  const API_BASE = "http://localhost:8081/api";

  // Fetch initial data
  useEffect(() => {
    fetchActivities();
    fetchTotalCalories();
    fetchWarning();
    fetchHistory();
    fetchExercises();
    fetchWorkoutHistory();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch(`${API_BASE}/activities`);
      const data = await response.json();
      setActivities(data);
      if (data.length > 0) {
        setSelectedActivity(data[0].name);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const fetchExercises = async () => {
    try {
      const response = await fetch(`${API_BASE}/workouts/exercises`);
      const data = await response.json();
      setExercises(data);
      if (data.length > 0) {
        setSelectedExercise(data[0].name);
      }
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  const fetchTotalCalories = async () => {
    try {
      const response = await fetch(`${API_BASE}/total`);
      const data = await response.json();
      setTotalCalories(data.totalCalories || 0);
    } catch (error) {
      console.error("Error fetching total calories:", error);
    }
  };

  const fetchWarning = async () => {
    try {
      const response = await fetch(`${API_BASE}/warning`);
      const data = await response.json();
      setWarningMessage(data.warning || "");
    } catch (error) {
      console.error("Error fetching warning:", error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_BASE}/usage`);
      const data = await response.json();
      setHistory(data.reverse()); // Show latest first
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const fetchWorkoutHistory = async () => {
    try {
      const response = await fetch(`${API_BASE}/workouts/history`);
      const data = await response.json();
      setWorkoutHistory(data.reverse());
    } catch (error) {
      console.error("Error fetching workout history:", error);
    }
  };

  const handleDigitalSubmit = async (e) => {
    e.preventDefault();
    if (!selectedActivity || !minutes || minutes <= 0) return;

    try {
      const response = await fetch(`${API_BASE}/usage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activityName: selectedActivity,
          minutes: parseInt(minutes),
        }),
      });

      if (response.ok) {
        setMinutes("");
        await fetchTotalCalories();
        await fetchWarning();
        await fetchHistory();
      }
    } catch (error) {
      console.error("Error submitting usage:", error);
    }
  };

  const handleWorkoutSubmit = async (e) => {
    e.preventDefault();
    if (!selectedExercise || !reps || reps <= 0) return;

    try {
      const response = await fetch(`${API_BASE}/workouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exerciseName: selectedExercise,
          weight: weight ? parseFloat(weight) : 0,
          reps: parseInt(reps),
        }),
      });

      if (response.ok) {
        setWeight("");
        setReps("");
        await fetchTotalCalories(); // Workout burns calories!
        await fetchWarning();
        await fetchWorkoutHistory();
      }
    } catch (error) {
      console.error("Error submitting workout:", error);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Wellness Hub</h1>
        <p>Balance Screen Time and Physical Health</p>
      </header>

      <div className="tabs">
        <div
          className={`tab ${currentTab === 'digital' ? 'active' : ''}`}
          onClick={() => setCurrentTab('digital')}
        >
          Screen Time
        </div>
        <div
          className={`tab ${currentTab === 'workout' ? 'active' : ''}`}
          onClick={() => setCurrentTab('workout')}
        >
          Workout
        </div>
      </div>

      {warningMessage && currentTab === 'digital' && (
        <div className="warning-message">
          <span>⚠️</span>
          {warningMessage}
        </div>
      )}

      <div className="total-calories-display">
        <h2>{totalCalories}</h2>
        <p>Net Digital Calories</p>
      </div>

      {currentTab === 'digital' && (
        <>
          <form onSubmit={handleDigitalSubmit}>
            <div className="form-group">
              <label htmlFor="activity">Select Digital Activity</label>
              <select
                id="activity"
                value={selectedActivity}
                onChange={(e) => setSelectedActivity(e.target.value)}
              >
                {activities.map((act) => (
                  <option key={act.id} value={act.name}>
                    {act.name} (Cost: {act.caloriesPerMinute} cal/min)
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="minutes">Minutes Spent</label>
              <input
                type="number"
                id="minutes"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="e.g. 30"
                min="1"
                required
              />
            </div>

            <button type="submit">Log Output</button>
          </form>

          {history.length > 0 && (
            <div className="history-section">
              <h3>Screen Time Log</h3>
              <ul className="history-list">
                {history.map((entry) => (
                  <li key={entry.id}>
                    <span className="history-activity">{entry.activityName}</span>
                    <span className="history-minutes">{entry.minutes} min</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {currentTab === 'workout' && (
        <>
          <form onSubmit={handleWorkoutSubmit}>
            <div className="form-group">
              <label htmlFor="exercise">Select Exercise</label>
              <select
                id="exercise"
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
              >
                {exercises.map((ex) => (
                  <option key={ex.id} value={ex.name}>
                    {ex.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="weight">Weight (kg/lbs)</label>
                <input
                  type="number"
                  step="0.1"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 20"
                  min="0"
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="reps">Reps</label>
                <input
                  type="number"
                  id="reps"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  placeholder="e.g. 10"
                  min="1"
                  required
                />
              </div>
            </div>

            <button type="submit">Log Workout (Burns Calories!)</button>
          </form>

          {workoutHistory.length > 0 && (
            <div className="history-section">
              <h3>Workout History</h3>
              <ul className="history-list">
                {workoutHistory.map((entry) => (
                  <li key={entry.id}>
                    <span className="history-activity">
                      {entry.exerciseName}
                    </span>
                    <span className="history-minutes">
                      {entry.weight > 0 ? `${entry.weight} W x ` : ''}{entry.reps} Reps
                      <strong style={{ marginLeft: '10px', color: '#00cec9' }}>(-{entry.caloriesBurned} cal)</strong>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
