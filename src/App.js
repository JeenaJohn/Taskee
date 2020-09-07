import React, { useState, useEffect } from "react";
import firebase, { auth, provider } from "./firebase.js";

import './App.css';

import logo from "./resources/images/calendar-logo.svg";


function App(){

  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);

  const logout = () => {
    auth.signOut().then(() => {
      setUser(null);
      setUserID(null);
    });
  };

  const login = () => {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      setUser(user);
      setUserID(user.uid);
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setUserID(user.uid);
      }
    });
  });

 return(
   <div>
     <header>
        <nav className="nav-bar">
          <div className="row">
            <div className="header__logo-box">
              <img src={logo} alt="Logo" className="header__logo" />
            </div>
            <div className="header__userinfo">
              {user ? (
                <h4>
                  Welcome {user.displayName}
                  <button className="btn btn-medium-ghost" onClick={logout}>
                    Logout
                  </button>
                </h4>
              ) : (
                <button className="btn btn-medium btn-nav-bar" onClick={login}>
                  Login with Google
                </button>
              )}
            </div>
          </div>
        </nav>
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
      </header>

      <section className="section-about">
        <div className="u-center-text u-margin-bottom-big">
          <h2 className="heading-secondary">
            Never Miss A Due Date &mdash; EVER!!
          </h2>
        </div>
        <div className="row">
          <div className="col span-1-of-2">
            <h3 className="heading-tertiary u-margin-bottom-small">
              Keep track of all your personal tasks
            </h3>
            <p className="paragraph u-margin-bottom-very-small">
              Many a times we miss out on important due dates, like the passport
              renewal date, car registration renewal and so on. Let's not miss
              any due dates again!!
            </p>
            <p className="paragraph u-margin-bottom-very-small">
              Now, with this app, all your tasks are in one place. Tasks are
              split into 3 buckets - tasks coming up in 3 months, tasks coming
              up in 6 months and tasks that are due only after 6 months. This
              will help you to prioritize and plan your tasks. 
            </p>
          </div>
          <div className="col span-1-of-2 ">
            <div className="row flex-container">
              <div className="col span-1-of-3 app-features">
                Passport / Visa Renewal
              </div>
              <div className="col span-1-of-3  app-features">Tax Filing</div>
              <div className="col span-1-of-3  app-features">HOA Dues</div>
            </div>

            <div className="row flex-container">
              <div className="col span-1-of-3 app-features">
                Home Maintenence
              </div>
              <div className="col span-1-of-3 app-features">
                Car Registration
              </div>
              <div className="col span-1-of-3 app-features">Doctor Appts</div>
            </div>

            <div className="row flex-container">
              <div className="col span-1-of-3 app-features">
                Yard Maintenence
              </div>
              <div className="col span-1-of-3 app-features ">
                Gutter cleaning
              </div>
              <div className="col span-1-of-3 app-features">
                A/C Filter replacement
              </div>
            </div>
          </div>
        </div>
      </section>

   </div>
 );
}

export default App;