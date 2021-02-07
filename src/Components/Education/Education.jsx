import React from "react";

const data = [
  {
    degree: "Bachelors In Technology",
    duration: "2019 - 2022",
    branch: "Information Technology",
    college: "Maharaja Agrasen Institute of Technology",
  },
  {
    degree: "Diploma",
    duration: "2016 - 2019",
    branch: "Computer Science",
    college: "Guru Nanak Dev Institute of Technology",
  },
];

function Education(props) {
  return (
    <div className="education">
      <div>
        <div className="heading-primary">Education</div>
      </div>
      <div className="education__container">

      {data.map(({ degree, duration, branch, college }) => (
        <div className="education__card">
          <h3 className="education__degree">{degree}</h3>
          <p className="education__info">{duration}</p>
          <p className="education__info">In {branch}</p>
          <p className="education__info">From {college}</p>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Education;
