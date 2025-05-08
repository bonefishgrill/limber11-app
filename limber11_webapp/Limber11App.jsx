import { useState, useEffect } from "react";

const exercises = [
  "Foam roll IT band",
  "Foam roll adductors",
  "Foam roll glutes",
  "Foam roll quads",
  "Stretch hip flexors",
  "Stretch hamstrings",
  "Glute bridges",
  "Mountain climbers",
  "Fire hydrants",
  "Scorpions",
  "Groiners"
];

export default function App() {
  const [completed, setCompleted] = useState(Array(exercises.length).fill(false));
  const [timers, setTimers] = useState(Array(exercises.length).fill(0));
  const [activeTimers, setActiveTimers] = useState(Array(exercises.length).fill(false));

  const toggleCompleted = (index) => {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);
  };

  const toggleTimer = (index) => {
    const newActiveTimers = [...activeTimers];
    newActiveTimers[index] = !newActiveTimers[index];
    setActiveTimers(newActiveTimers);
  };

  const resetTimers = () => {
    setTimers(Array(exercises.length).fill(0));
    setActiveTimers(Array(exercises.length).fill(false));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) =>
        prev.map((t, i) => (activeTimers[i] ? t + 1 : t))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTimers]);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Limber 11 Routine</h1>
      {exercises.map((exercise, index) => (
        <div key={index} style={{ marginBottom: "12px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label>
              <input
                type="checkbox"
                checked={completed[index]}
                onChange={() => toggleCompleted(index)}
              />
              <span style={{ marginLeft: "8px", textDecoration: completed[index] ? "line-through" : "none" }}>
                {exercise}
              </span>
            </label>
            <div>
              <span>{timers[index]}s </span>
              <button onClick={() => toggleTimer(index)}>
                {activeTimers[index] ? "Pause" : "Start"}
              </button>
            </div>
          </div>
        </div>
      ))}
      <div style={{ marginTop: "16px" }}>
        <button onClick={() => setCompleted(Array(exercises.length).fill(false))}>Reset Routine</button>
        <button onClick={resetTimers} style={{ marginLeft: "10px" }}>Reset Timers</button>
      </div>
    </div>
  );
}
