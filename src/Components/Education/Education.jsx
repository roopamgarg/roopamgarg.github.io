import React from "react";
import data from "../../data";


function Education(props) {
  return (
    <div className="education">
      <div>
        <div className="heading-primary">Education</div>
      </div>
      <div className="education__container">

      {data.education.map(({ degree, duration, branch, college }) => (
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
