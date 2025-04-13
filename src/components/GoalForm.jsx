import React, { useState, useEffect } from "react";
import "./GoalForm.css";

const initialState = {
  title: "",
  target: "",
  unit: "steps", // default
};

function GoalForm({ onAddGoal, onUpdateGoal, editGoal }) {
  const [formData, setFormData] = useState(initialState);

  // update form if editGoal change (edit mode)
  useEffect(() => {
    if (editGoal) {
      setFormData(editGoal);
    } else {
      setFormData(initialState);
    }
  }, [editGoal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.target) return;

    if (editGoal) {
      onUpdateGoal(formData); // mode modification
    } else {
      onAddGoal({ ...formData, id: Date.now(), progress: 0 }); // mode ajout
    }

    setFormData(initialState); // reset
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          {editGoal ? "Modifier l'objectif" : "Créer un nouvel objectif"}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-container">
          <div className="form-group">
            <label className="form-label">
              Titre de l'objectif
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="Ex: Marcher 10 000 pas"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Cible à atteindre
            </label>
            <input
              type="number"
              name="target"
              value={formData.target}
              onChange={handleChange}
              className="form-input"
              placeholder="Ex: 10000"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Unité de mesure
            </label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="form-select"
            >
              <option value="steps">Pas</option>
              <option value="liters">Litres d'eau</option>
              <option value="sessions">Séances</option>
            </select>
          </div>
        </div>

        <div className="form-footer">
          <button
            type="submit"
            className="button button-primary button-full"
          >
            {editGoal ? "Mettre à jour" : "Créer l'objectif"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default GoalForm;
