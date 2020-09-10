import React, { useState } from "react";
import firebase from "./firebase.js";
import { toast } from "react-toastify";
import add_task from "./resources/images/add-task.svg";

function AddCard(props) {
  const databaseRef = firebase.database().ref("tasks/" + props.userID);

  const [newTaskName, setNewTaskName] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newNotes, setNewNotes] = useState("");

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

  /* save task or after save, button text is changed to Add another task
   When button is clicked, check if cardAddedFlag is set. If so, make the form
   ready for next input*/
  const saveNewTask = (e, taskName, dueDate, notes) => {
    e.preventDefault();
    if (cardAddedFlag === true) {

       /* clear the input fields */
      setNewTaskName("");
      setNewDueDate("");
      setNewNotes("");
    /* set card added flag */
      setCardAddedFlag(false);

    } else {

      /* no errors */
      databaseRef.push({ taskName, dueDate, notes });
      toast.success("Task added successfully");

       /* set card added flag */
       setCardAddedFlag(true);
    }
  };

  return (
    <div className="row">
      <div className="col span-1-of-2">
        <form
          className="new-card"
          onSubmit={(e) => saveNewTask(e, newTaskName, newDueDate, newNotes)}
        >
          <input
            className={`card-doc-text u-width-80 ${
              cardAddedFlag ? "card-saved" : ""
            } `}
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
              className={`card-date-input ${
                cardAddedFlag ? "card-saved" : ""
              } `}
              value={newDueDate}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <div>
            <label htmlFor="notes">Notes</label>
            <textarea
              name="notes"
              className={`card-notes ${cardAddedFlag ? "card-saved" : ""} `}
              rows="4"
              maxLength="150"
              placeholder="Add more details..."
              value={newNotes}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="u-center-text u-margin-top-small">
            <button
              className={`btn btn-medium ${
                saveBtnDisabled ? "btn-disabled" : ""
              } `}
              type="submit"
              disabled={saveBtnDisabled}
            >
              {cardAddedFlag ? "Add another Task" : "Save Task"}
            </button>
          </div>
        </form>
      </div>
      <div className=" col span-1-of-2">
        <img src={add_task} alt="Add Task" className="new-card-img" />
      </div>
    </div>
  );
}

export default AddCard;
