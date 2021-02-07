import React from "react";
import poll from "../../images/poll.png";
import pracify from "../../images/pracify_sc.png";
import hoohoop from "../../images/hoohoop_sc.png";
import monktree from "../../images/monktree_sc.png";
import iosd from "../../images/iosd_sc.png";
import fourier from "../../images/fourier.png";
const data = [

  {
    name: "Pracify",
    points: [
      "Real Time Polling system build on top of web sockets.",
      "User's can create or vote on a poll anonymously.",
      "Anyone can see the poll results instantly.",
    ],
    image: pracify,
  },

  {
    name: "HooHoop",
    points: [
      "Real Time Polling system build on top of web sockets.",
      "User's can create or vote on a poll anonymously.",
      "Anyone can see the poll results instantly.",
    ],
    image: hoohoop,
  },

  {
    name: "Monktree",
    points: [
      "Real Time Polling system build on top of web sockets.",
      "User's can create or vote on a poll anonymously.",
      "Anyone can see the poll results instantly.",
    ],
    image: monktree,
  },

  {
    name: "IOSD ",
    points: [
      "Real Time Polling system build on top of web sockets.",
      "User's can create or vote on a poll anonymously.",
      "Anyone can see the poll results instantly.",
    ],
    image: iosd,
  },
  {
    name: "Real Time Poll",
    points: [
      "Real Time Polling system build on top of web sockets.",
      "User's can create or vote on a poll anonymously.",
      "Anyone can see the poll results instantly.",
    ],
    image: poll,
  },
  {
    name: "Fourier Series Visualizer",
    points: [
      "Real Time Polling system build on top of web sockets.",
      "User's can create or vote on a poll anonymously.",
      "Anyone can see the poll results instantly.",
    ],
    image: fourier,
  },

  {
    name: "Git Forker",
    points: [
      "Real Time Polling system build on top of web sockets.",
      "User's can create or vote on a poll anonymously.",
      "Anyone can see the poll results instantly.",
    ],
    image: poll,
  },

  {
    name: "Read Speak",
    points: [
      "Real Time Polling system build on top of web sockets.",
      "User's can create or vote on a poll anonymously.",
      "Anyone can see the poll results instantly.",
    ],
    image: poll,
  },
];

function Projects(props) {
  return (
    <div className="projects" id="projects">
        <div className="heading-primary">Projects</div>

      {data.map(({ image, points, name }, index) => (
        <div className={`project ${(index%2 === 0) ? "left" : "right"}`}>
          <div className="project__image">
            <img src={image} alt="poll" />
          </div>
          <div className="project__content">
            <div className="project__name">{name}</div>
            {points.map((point) => (
              <div className="project__point">{point}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Projects;
