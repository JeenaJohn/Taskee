import React, { useState } from "react";

import firebase from "./firebase.js";
import { toast } from "react-toastify";
import add_task from "./resources/images/add-task.svg";

function AddCard(props) {
  const databaseRef = firebase.database().ref("tasks/" + props.userID);

  const [newTaskName, setNewTaskName] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [firebaseID, setFirebaseID] = useState("");

  //const [userMsg, setUserMsg] = useState("");
  const [cardAddedFlag, setCardAddedFlag] = useState(false);

  let saveBtnDisabled = props.userID == null ? true : false;

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

  /*const validateData = (taskName, dueDate) => {
    let error = " ";
    if (taskName.length === 0) {
      error = "Task name is missing";
    }
    setUserMsg(error);
  }; */

  const saveNewTask = (e, taskName, dueDate, notes) => {
    e.preventDefault();
    /* no errors */
    databaseRef.push({ taskName, dueDate, notes });

    toast.success("Task added successfully");

    /* set card added flag */
    setCardAddedFlag(true);
  };

  const addAnotherTask = (e) => {
    e.preventDefault();
    /* clear the input fields */
    setNewTaskName("");
    setNewDueDate("");
    setNewNotes("");
    /* set card added flag */
    setCardAddedFlag(false);
  };

  return (
    <div className="row">
      <div className="col span-1-of-2 ">
        {cardAddedFlag ? (
          <div className="new-card-box ">
            <div className="card ">
              <div className="card-details u-padding-left ">
                <div className="card-doc-text card-taskname-display-mode u-draw-line">
                  {newTaskName}
                </div>
                <div className="u-draw-line">
                  <label htmlFor="dueDate">Due on</label>
                  <div className="card-date-input card-date-display-mode">
                    {newDueDate}
                  </div>
                </div>
                <div>
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    name="notes"
                    className="card-notes display-mode"
                    rows="4"
                    maxLength="150"
                    value={newNotes}
                  />
                </div>
              </div>
            </div>
            <div className="u-center-text u-margin-top-small u-margin-bottom-small">
              <button
                className="btn btn-medium"
                type="submit"
                onClick={(e) => addAnotherTask(e)}
              >
                Add another Task
              </button>
            </div>
          </div>
        ) : (
          <form
            className="new-card"
            onSubmit={(e) => saveNewTask(e, newTaskName, newDueDate, newNotes)}
          >
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
              <label htmlFor="dueDate">Due on</label>
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
              <label htmlFor="notes">Notes</label>
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

            <div className="u-center-text u-margin-top-small u-margin-bottom-small ">
              <button
                className={`btn btn-medium ${
                  saveBtnDisabled ? "btn-disabled" : ""
                } `}
                type="submit"
                disabled={saveBtnDisabled}
              >
                Save Task
              </button>
            </div>
          </form>
        )}
      </div>
      <div className=" col span-1-of-2">
        <img src={add_task} alt="Add Task" className="new-card-img" />
      </div>
    </div>
  );
}

export default AddCard;
