import React from "react";
import AddCard from "./AddCard";
import Buckets from "./Buckets";

function MyTasks(props) {
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
         u-text-left u-margin-bottom-small"
          >
            Add new Task
          </h3>

          <AddCard />
        </div>
      </section>
    </div>
  );
}

export default MyTasks;
