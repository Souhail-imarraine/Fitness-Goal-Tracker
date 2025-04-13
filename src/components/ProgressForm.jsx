import React, { useState } from "react";
import "./ProgressForm.css";

function ProgressForm({ goals, onAddProgress }) {
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedGoalId || !amount) return;

    onAddProgress(selectedGoalId, parseInt(amount));
    setAmount("");
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Ajouter un progrès</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-container">
          <div className="form-group">
            <label className="form-label">
              Sélectionner un objectif
            </label>
            <select
              value={selectedGoalId}
              onChange={(e) => setSelectedGoalId(e.target.value)}
              className="form-select"
            >
              <option value="">-- Choisir un objectif --</option>
              {goals.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.title} ({goal.progress} / {goal.target} {goal.unit})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Quantité à ajouter
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form-input"
              placeholder="Ex: 2000"
              min="0"
            />
          </div>
        </div>

        <div className="form-footer">
          <button
            type="submit"
            className="button button-primary button-full"
          >
            Enregistrer le progrès
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProgressForm;
