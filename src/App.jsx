import React, { useState, useEffect } from "react";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import ProgressForm from "./components/ProgressForm";
import Summary from "./components/Summary";
import "./App.css";

function App() {
  const [goals, setGoals] = useState([]);
  const [editGoal, setEditGoal] = useState(null);

  // ✅ Load from localStorage
  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    setGoals(storedGoals);
  }, []);

  // 💾 Save to localStorage
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  // ➕ Add goal
  const handleAddGoal = (goal) => {
    setGoals((prevGoals) => [...prevGoals, goal]);
  };

  //  Update goal
  const handleUpdateGoal = (updatedGoal) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === updatedGoal.id ? updatedGoal : goal
      )
    );
    setEditGoal(null);
  };

  // Delete goal
  const handleDeleteGoal = (id) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  };

  // Select goal to edit
  const handleEditGoal = (goal) => {
    setEditGoal(goal);
  };

  // ➕ Add progress
  const handleAddProgress = (goalId, value) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === parseInt(goalId)
          ? { ...goal, progress: goal.progress + value }
          : goal
      )
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="container">
          <div className="header-content">
            <div className="header-title-container">
              <div>
                <h1 className="app-title">Fitness Goal Tracker</h1>
                <p className="app-subtitle">Suivez vos progrès vers une vie plus saine</p>
              </div>
            </div>
            <div className="header-stats">
              <div className="goal-count-badge">
                <p className="goal-count-text">
                  {goals.length} Objectifs
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main container">
        <div className="dashboard-layout">
          {/* Left Sidebar */}
          <div className="dashboard-sidebar">
            {/* Goal Form Card */}
            <div className="dashboard-card">
              <div className="card-header card-header-indigo">
                <h2 className="card-header-title">
                  {editGoal ? "Modifier l'objectif" : "Nouvel Objectif"}
                </h2>
              </div>
              <div className="card-content">
                <GoalForm
                  onAddGoal={handleAddGoal}
                  onUpdateGoal={handleUpdateGoal}
                  editGoal={editGoal}
                />
              </div>
            </div>

            {/* Progress Form Card */}
            <div className="dashboard-card">
              <div className="card-header card-header-green">
                <h2 className="card-header-title">
                  Ajouter un Progrès
                </h2>
              </div>
              <div className="card-content">
                <ProgressForm goals={goals} onAddProgress={handleAddProgress} />
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="dashboard-main">
            {/* Summary Card */}
            <div className="dashboard-card">
              <div className="card-header card-header-blue">
                <h2 className="card-header-title">
                  Résumé des Performances
                </h2>
              </div>
              <div className="card-content">
                <Summary goals={goals} />
              </div>
            </div>

            {/* Goals List Card */}
            <div className="dashboard-card">
              <div className="card-header card-header-purple">
                <h2 className="card-header-title">
                  Mes Objectifs
                </h2>
              </div>
              <div className="card-content">
                <GoalList
                  goals={goals}
                  onDelete={handleDeleteGoal}
                  onEdit={handleEditGoal}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container">
          <p className="footer-text">
            © 2024 Fitness Goal Tracker. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
