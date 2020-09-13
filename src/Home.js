import React from "react";
import home_page from "./resources/images/home-pg-img.svg";

function Home() {
  return (
    <section id="section-home" className="section-home">
      <div className="row u-margin-left ">
        
        <div className="col span-1-of-2 u-text-left u-margin-top-huge u-margin-bottom-medium">
          <div className="header__text-box">
            <h1 className="heading-primary">
              <span className="heading-primary--main">Taskee</span>
              <span className="heading-primary--sub">
                Reminder for your personal tasks
              </span>
            </h1>
            <a href="#section-list-data" className="btn btn-header">
              Show my Tasks
            </a>
          </div>
        </div>

        <div className="col span-1-of-2 ">
          <p className="paragraph">
            <img src={home_page} alt="Taskee" className="home-page-img" />
          </p>
        </div>

      </div>
    </section>
  );
}

export default Home;
