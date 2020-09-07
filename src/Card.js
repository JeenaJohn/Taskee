import React, { useState, useEffect } from "react";

function Card(props) {
  const [editMode, setEditMode] = useState(false);

  const [taskName, setTaskName] = useState(props.taskName);
  const [dueDate, SetDueDate] = useState(props.dueDate);
  const [notes, setNotes] = useState(props.notes);

  useEffect(() => {
    setEditMode(false);
    setTaskName(props.taskName);
    SetDueDate(props.dueDate);
    setNotes(props.notes);
  }, [props]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    switch (name) {
      case "taskName":
        setTaskName(value);
        break;
      case "dueDate":
        SetDueDate(value);
        break;
      case "notes":
        setNotes(value);
        break;
      default:
    }
  };

  const discardChanges = () => {
    setEditMode(false);
    setNotes(props.notes);
    setTaskName(props.taskName);
    SetDueDate(props.dueDate);
  };

  return (
    <div className="card">
      <div className={` ${editMode ? "u-display-none " : "icon-edit"}`}>
        <button
          className="btn-icon"
          title="Edit Task"
          type="submit"
          onClick={() => setEditMode(true)}
        >
          <ion-icon name="create-outline"></ion-icon>
        </button>
      </div>

      {/* close button during edit mode */}
      <div className={` ${editMode ? "icon-close " : "u-display-none"}`}>
        <button
          className="btn-icon"
          title="Discard changes"
          type="submit"
          onClick={() => discardChanges()}
        >
          <ion-icon name="close-circle-outline"></ion-icon>
        </button>
      </div>

      <div className="card-details">
        <input
          className={`card-doc-text ${
            editMode ? "edit-mode" : "display-mode"
          } `}
          type="text"
          name="taskName"
          value={taskName}
          onChange={(e) => handleChange(e)}
          readOnly={!editMode}
        />

        <div className={` ${editMode ? "display-mode" : "card-date"} `}>
          <label for="dueDate" className="card-date-label">
            Due on{" "}
          </label>
          <input
            type="date"
            name="dueDate"
            className={`card-date-input ${
              editMode ? "edit-mode" : "display-mode"
            } `}
            value={dueDate}
            onChange={(e) => handleChange(e)}
            readOnly={!editMode}
          />
        </div>

        <div className="card-notes">
          <label for="notes" className="card-notes-label">
            Notes{" "}
          </label>
          <textarea
            name="notes"
            className={`card-notes ${editMode ? "edit-mode" : "display-mode"} `}
            rows="4"
            maxLength="150"
            value={notes}
            onChange={(e) => handleChange(e)}
            readOnly={!editMode}
          />
        </div>
      </div>

      <div className={`u-center-text ${editMode ? " " : "u-display-none"}`}>
        <button
          className="btn btn-medium"
          type="submit"
          onClick={(e) =>
            props.editTask(
              e,
              props.id,
              props.index,
              taskName,
              dueDate,
              notes
            )
          }
        >
          Save
        </button>
      </div>

      <div className={` ${editMode ? "u-display-none " : "icon-delete"}`}>
        <button
          className="btn-icon"
          title="Delete Task"
          type="submit"
          onClick={(e) => props.deleteTask(e, props.id, props.index)}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </div>
    </div>
  );
}

export default Card;
