import React from "react";

function About() {
  return (
    <div>
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

export default About;
