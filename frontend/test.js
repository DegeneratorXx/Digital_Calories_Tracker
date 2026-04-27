fetch("http://localhost:8081/api/workouts", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        exerciseName: "Squats",
        weight: 50,
        reps: 10
    })
}).then(async res => {
    console.log("Status:", res.status);
    console.log("Body:", await res.text());
}).catch(console.error);
