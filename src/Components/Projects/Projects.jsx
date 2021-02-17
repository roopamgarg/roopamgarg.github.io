import React from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import poll from "../../images/poll.png";
import pracify from "../../images/pracify_sc.png";
import hoohoop from "../../images/hoohoop_sc.png";
import monktree from "../../images/monktree_sc.png";
import iosd from "../../images/iosd_sc.png";
import fourier from "../../images/fourier.png";
import gitforker from "../../images/gitforker.png";

const data = [
  {
    name: "Pracify",
    points: [
      "Pracify helps companies scale on-demand by connecting them to a network of selected and trained gig workers for performing easily doable task-based jobs on a pay-per-performance system.",
      "Companies can directly monitor there tasks completion in real time.",
      "Users can redeem there earned rewards from there wallet anytime.",
    ],
    image: pracify,
  },

  {
    name: "HooHoop",
    points: [
      "Hoohoop NZ is a New-Zealand-based Car Search & Deal Venture.",
      "Features like Gyroscope enabled 360° interior and 360° exterior view for cars.",
      "Anyone can add there car for selling after paying minimal amount for posting",
    ],
    image: hoohoop,
  },

  {
    name: "IOSD ",
    points: [
      "IOSD helps student's in improving there coding skills by building open source projects and teaching programming concepts.",
      "Anyone can watch the recorded lectures or playlist after paying subscription fee",
      "Student's can get regular updates about what IOSD is planning in different colleges",
      "Every college activities were updated by their college IOSD council members"
    ],
    image: iosd,
  },

  {
    name: "Monktree",
    points: [
      "Monktree improves student's education quality from stationary to learning, from internship to Placement.",
      "Anyone can get access to all these features after paying the subscription fee",
    ],
    image: monktree,
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
  // {
  //   name: "Fourier Series Visualizer",
  //   points: [
  //     "Visualization of a mathematical concept fourier series",
  //   ],
  //   image: fourier,
  // },

  // {
  //   name: "Git Forker",
  //   points: [
  //     "Real Time Polling system build on top of web sockets.",
  //     "User's can create or vote on a poll anonymously.",
  //     "Anyone can see the poll results instantly.",
  //   ],
  //   image: gitforker,
  // },

  // {
  //   name: "Read Speak",
  //   points: [
  //     "Real Time Polling system build on top of web sockets.",
  //     "User's can create or vote on a poll anonymously.",
  //     "Anyone can see the poll results instantly.",
  //   ],
  //   image: poll,
  // },
];


function Projects(props) {
  return (
    <div className="projects" id="projects">
      <div className="heading-primary">Projects</div>

      {data.map(({ image, points, name }, index) => (
        <ProjectCard index={index} image={image} points={points} name={name} />
      ))}
    </div>
  );
}

export default Projects;
