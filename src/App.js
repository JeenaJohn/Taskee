import React, { useState, useEffect } from "react";
import firebase, { auth, provider } from "./firebase.js";

import About from "./About";
import MyTasks from "./MyTasks";

import "./App.css";

import logo from "./resources/images/calendar-logo.svg";

function App() {
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

  return (
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

      {/* Display details about the app */}
      <About />

       {/* Display My Tasks - Add Card, Buckets for 3 months, 6 months and 6+ months */}
       <MyTasks userID={userID} />

      <footer>
        <div className="row u-center-text">
          <p className="paragraph">
            {" "}
            Copyright &copy; 2020 by Taskee. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
