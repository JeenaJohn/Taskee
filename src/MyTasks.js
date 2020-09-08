import React, { useState, useEffect } from "react";
import firebase from "./firebase.js";
import AddCard from "./AddCard";
import Card from "./Card";

import { toast } from "react-toastify";

function MyTasks(props) {
  const [tasks, setTasks] = useState([]);

  //const [count_3months, setCount_3months] = useState(0);
  //const [count_6months, setCount_6months] = useState(0);
  //const [count_After_6months, setCount_After6months] = useState(0);

  const databaseRef = firebase.database().ref("tasks/" + props.userID);

  let d_3months_ISO, d_6months_ISO;
  let count_3months, count_6months, count_After_6months;

  useEffect(() => {
    console.log(databaseRef);

    console.log(props);

    databaseRef.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          taskName: items[item].taskName,
          dueDate: items[item].dueDate,
          notes: items[item].notes,
        });
      }

      setTasks(newState);
    });
  }, [props]);

  const filter_tasks_to_get_count = () => {
    count_3months = tasks.filter((task) => task.dueDate <= d_3months_ISO)
      .length;

    count_6months = tasks.filter(
      (task) => d_3months_ISO < task.dueDate && task.dueDate <= d_6months_ISO
    ).length;

    count_After_6months = tasks.filter((task) => task.dueDate > d_6months_ISO)
      .length;
  };

  const compute_future_dates = () => {
    let d = new Date();
    let d_3months = new Date();
    let d_6months = new Date();

    d_3months.setMonth(d.getMonth() + 3);
    d_6months.setMonth(d.getMonth() + 6);
    d_3months_ISO = d_3months.toISOString().split("T")[0];
    d_6months_ISO = d_6months.toISOString().split("T")[0];
  };

  const deleteTask = (e, firebaseId, index) => {
    e.preventDefault();

    var updates = {};
    updates["/" + firebaseId] = {};
    databaseRef.update(updates);
    toast.success("Task deleted. Note: Your list is now up to date");
  };

  const editTask = (e, firebaseId, index, taskName, dueDate, notes) => {
    e.preventDefault();

    var editedData = {
      taskName: taskName,
      dueDate: dueDate,
      notes: notes,
    };

    var updates = {};
    updates["/" + firebaseId] = editedData;
    databaseRef.update(updates);

    toast.success(
      "Task updated sucessfully. Note: Task may move to another bucket if the due date was changed."
    );
  };

  compute_future_dates();
  filter_tasks_to_get_count();

  return (
    <div>
      <section id="section-list-data" className="section-list-data">
        <div className="u-center-text u-margin-bottom-medium">
          <h2 className="heading-secondary bg-color-blue">My Tasks</h2>
        </div>
        {props.userID === null ? (
          <p className="paragraph u-text-left u-padding-left u-text-color-red">
            You have to login to use this app.
          </p>
        ) : null}

        {/* Add new Task */}
        <div className="box-task">
          <h3
            className="heading-tertiary task-headings
         u-text-left u-padding-left u-margin-bottom-small"
          >
            Add new Task
          </h3>

          <AddCard userID={props.userID} />
        </div>

        {/* Coming up in 3 months */}
        <div className="box-task">
          <h3
            className="heading-tertiary task-headings
         u-text-left u-margin-bottom-medium"
          >
            Coming up in 3 months ({count_3months} tasks)
          </h3>
          <div className="container-cards">
            {count_3months > 0 ? (
              tasks
                .filter((task) => task.dueDate <= d_3months_ISO)
                .map((task, index) => (
                  <Card
                    id={task.id}
                    taskName={task.taskName}
                    dueDate={task.dueDate}
                    notes={task.notes}
                    index={index}
                    key={index}
                    editTask={editTask}
                    deleteTask={deleteTask}
                  />
                ))
            ) : (
              <h4 className="h4">No tasks are due</h4>
            )}
          </div>
        </div>

        {/* Coming up in 6 months */}
        <div className="box-task">
          <h3
            className="heading-tertiary task-headings
          u-text-left u-margin-bottom-medium"
          >
            Coming up in 6 months ({count_6months} tasks)
          </h3>
          <div className="container-cards">
            {count_6months > 0 ? (
              tasks
                .filter(
                  (task) =>
                    d_3months_ISO < task.dueDate &&
                    task.dueDate <= d_6months_ISO
                )
                .map((task, index) => (
                  <Card
                    id={task.id}
                    taskName={task.taskName}
                    dueDate={task.dueDate}
                    notes={task.notes}
                    index={index}
                    key={index}
                    editTask={editTask}
                    deleteTask={deleteTask}
                  />
                ))
            ) : (
              <h4 className="h4">No tasks are due</h4>
            )}
          </div>
        </div>

        {/* Coming up in 6+ months*/}
        <div className="box-task">
          <h3
            className="heading-tertiary task-headings
          u-text-left u-margin-bottom-medium"
          >
            Coming up in 6+ months ({count_After_6months} tasks)
          </h3>
          <div className="container-cards">
            {count_After_6months > 0 ? (
              tasks
                .filter((task) => task.dueDate > d_6months_ISO)
                .map((task, index) => (
                  <Card
                    id={task.id}
                    taskName={task.taskName}
                    dueDate={task.dueDate}
                    notes={task.notes}
                    index={index}
                    key={index}
                    editTask={editTask}
                    deleteTask={deleteTask}
                  />
                ))
            ) : (
              <h4 className="h4">No tasks are due</h4>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MyTasks;
