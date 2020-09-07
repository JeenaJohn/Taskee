import React, { useState } from "react";
import add_task from "./resources/images/add-task.svg";

function AddCard(props) {
  const [newTaskName, setNewTaskName] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "taskName":
        setNewTaskName(value);
        break;
      case "dueDate":
        setNewDueDate(value);
        break;
      case "notes":
        setNewNotes(value);
        break;
      default:
    }
  };

  return (
    <div className="row">
      <div className="col span-1-of-2">
        <div className="new-card">
            <input
              className="card-doc-text u-width-80"
              type="text"
              name="taskName"
              placeholder="Task name"
              maxLength="40"
              value={newTaskName}
              onChange={(e) => handleChange(e)}
              required
            />

            <div>
              <label for="dueDate">
                Due on
              </label>
              <input
                type="date"
                name="dueDate"
                className="card-date-input"
                value={newDueDate}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <div>
              <label for="notes">
                Notes
              </label>
              <textarea
                name="notes"
                className="card-notes"
                rows="4"
                maxLength="150"
                placeholder="Add more details..."
                value={newNotes}
                onChange={(e) => handleChange(e)}
              />
            </div>
          
          <div className="u-center-text u-margin-top-small">
            <button
              className="btn btn-medium "
              type="submit"
              onClick={(e) => props.save(e, newTaskName, newDueDate, newNotes)}
            >
              Save
            </button>
        </div>
        </div>
      </div>
      <div className=" col span-1-of-2">
        <img src={add_task} alt="Add Task" className="new-card-img" />
      </div>
    </div>
  );
}

export default AddCard;
