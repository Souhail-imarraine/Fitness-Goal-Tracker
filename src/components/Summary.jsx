import React from "react";
import "./Summary.css";

function Summary({ goals }) {
  const totalGoals = goals.length;
  const completedGoals = goals.filter((goal) => goal.progress >= goal.target).length;
  const averageProgress =
    totalGoals === 0
      ? 0
      : Math.round(
          (goals.reduce((acc, goal) => acc + Math.min(goal.progress / goal.target, 1), 0) /
            totalGoals) *
            100
        );

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Résumé</h2>
      </div>
      
      <div className="card-body">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon stat-icon-blue">
              <span>{totalGoals}</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Objectifs totaux</p>
              <p className="stat-value">
                {totalGoals} {totalGoals <= 1 ? 'objectif' : 'objectifs'}
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-green">
              <span>{completedGoals}</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Objectifs atteints</p>
              <p className="stat-value">
                {completedGoals} {completedGoals <= 1 ? 'terminé' : 'terminés'}
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-orange">
              <span>{averageProgress}</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Progression moyenne</p>
              <p className="stat-value">{averageProgress}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
