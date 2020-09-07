import React from "react";
import AddCard from "./AddCard";
import Buckets from "./Buckets";

function MyTasks(props) {
  const [userMsg, setUserMsg] = useState("");

  const validateData = (taskName, dueDate) => {
    let error = " ";
    if (taskName.length === 0) {
      error = "Task name is missing";
    }
    setUserMsg(error);
  };

  const saveNewDocData = (e, taskName, dueDate, notes) => {
    e.preventDefault();
    validateData(taskName, dueDate);
    if (userMsg.length === 0) {
      /* no errors */
      itemsRef.push({ taskName, dueDate, notes });
    }
  };

  return (
    <div>
      <section id="section-list-data" className="section-list-data">
        <div className="u-center-text u-margin-bottom-medium">
          <h2 className="heading-secondary bg-color-blue">My Tasks</h2>
        </div>
        {props.userID === null ? (
          <p className="paragraph u-text-left u-text-color-red">
            You have to login to use this app.
          </p>
        ) : null}

        <div className="box-task">
          <h3
            className="heading-tertiary task-headings
         u-text-left u-padding-left u-margin-bottom-small"
          >
            Add new Task
          </h3>

          <AddCard save={saveNewTask} />
        </div>
      </section>
    </div>
  );
}

export default MyTasks;
