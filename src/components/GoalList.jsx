import React from "react";
import "./GoalList.css";

function GoalList({ goals, onDelete, onEdit }) {
  if (goals.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Liste des objectifs</h2>
        </div>
        <div className="empty-state">
          <div className="empty-icon">
            <span>0</span>
          </div>
          <h3 className="empty-title">Aucun objectif pour l'instant</h3>
          <p className="empty-message">Commencez par créer votre premier objectif de fitness</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Liste des objectifs ({goals.length})</h2>
      </div>
      
      <div className="goal-list">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="goal-item"
          >
            <div className="goal-layout">
              <div className="goal-content">
                <div className="goal-header">
                  <h3 className="goal-title">
                    {goal.title}
                  </h3>
                  {goal.progress >= goal.target && (
                    <span className="badge badge-success">
                      Objectif atteint
                    </span>
                  )}
                </div>
                
                <div className="goal-details">
                  <div className="goal-stat">
                    <span className="goal-stat-label">Objectif:</span>
                    <span className="goal-stat-value">
                      {goal.target} {goal.unit}
                    </span>
                  </div>
                  
                  <div className="goal-stat">
                    <span className="goal-stat-label">Progression:</span>
                    <span className="goal-stat-value">
                      {goal.progress} / {goal.target}
                    </span>
                  </div>

                  <div className="progress-container">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${Math.min((goal.progress / goal.target) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="goal-actions">
                <button
                  onClick={() => onEdit(goal)}
                  className="button button-secondary"
                  title="Modifier"
                >
                  Modifier
                </button>
                <button
                  onClick={() => onDelete(goal.id)}
                  className="button button-danger"
                  title="Supprimer"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GoalList;
