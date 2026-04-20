import { useState, useEffect } from 'react';

function App() {
  const [activities, setActivities] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [warningMessage, setWarningMessage] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [minutes, setMinutes] = useState("");
  const [history, setHistory] = useState([]);

  const API_BASE = "http://localhost:8080/api";

  // Fetch initial data
  useEffect(() => {
    fetchActivities();
    fetchTotalCalories();
    fetchWarning();
    fetchHistory();
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
      setHistory(data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleSubmit = async (e) => {
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
        // Clear input and refresh state
        setMinutes("");
        await fetchTotalCalories();
        await fetchWarning();
        await fetchHistory();
      }
    } catch (error) {
      console.error("Error submitting usage:", error);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Digital Calories</h1>
        <p>Track your screen time impact</p>
      </header>

      {warningMessage && (
        <div className="warning-message">
          <span>⚠️</span>
          {warningMessage}
        </div>
      )}

      <div className="total-calories-display">
        <h2>{totalCalories}</h2>
        <p>Total Calories</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="activity">Select Activity</label>
          <select 
            id="activity" 
            value={selectedActivity} 
            onChange={(e) => setSelectedActivity(e.target.value)}
          >
            {activities.map((act) => (
              <option key={act.name} value={act.name}>
                {act.name}
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

        <button type="submit">Add Usage</button>
      </form>

      {history.length > 0 && (
        <div className="history-section">
          <h3>Your Activities</h3>
          <ul className="history-list">
            {history.map((entry, index) => (
              <li key={index}>
                <span className="history-activity">{entry.activityName}</span>
                <span className="history-minutes">{entry.minutes} min</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
