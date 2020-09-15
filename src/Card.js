import React, { useState, useEffect } from "react";

function Card(props) {
  const [editMode, setEditMode] = useState(false);
  const [deletedFlag, setDeletedFlag] = useState(false);

  const [taskName, setTaskName] = useState(props.taskName);
  const [dueDate, SetDueDate] = useState(props.dueDate);
  const [notes, setNotes] = useState(props.notes);
  const [dueDate_D, setDueDate_D] = useState(""); /*for Display mode */

  function convertDate(date) {
    let datearray = date.split("-");
    let newdate = datearray[1] + "-" + datearray[2] + "-" + datearray[0];
    setDueDate_D(newdate);
  }

  useEffect(() => {
    setEditMode(false);
    setDeletedFlag(false);
    setTaskName(props.taskName);
    SetDueDate(props.dueDate);
    setNotes(props.notes);

    convertDate(props.dueDate); // from yyyy-mm-dd to mm-dd-yyyy format
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
    setDeletedFlag(false);
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

      <div className="card-details ">
        <div className={` ${editMode ? " " : "u-draw-line"} `}>
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
        </div>
        {/*  In iOS, a readonly date field is still changeable; so in readonly mode, date is displayed inside a <div> instead of <input>*/}
        <div className={` ${editMode ? " " : "u-draw-line"} `}>
          <label htmlFor="dueDate">
            Due on{" "}
          </label>
          {editMode ? (
            <input
              type="date"
              name="dueDate"
              className="card-date-input edit-mode"
              value={dueDate}
              onChange={(e) => handleChange(e)}
            />
          ) : (
            <div className="card-date-input card-date-display-mode">
              {dueDate_D}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="notes">
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
            props.editTask(e, props.id, taskName, dueDate, notes)
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
          onClick={(e) => {
            setDeletedFlag(true);
            props.deleteTask(e, props.id);
          }}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </div>
    </div>
  );
}

export default Card;
