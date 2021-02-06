import React from "react";
import hoohoop from "../../images/hoohoop.png";
import pracify from "../../images/pracify.png";
import iosd from "../../images/iosd.png";
import monktree from "../../images/monktree.png";
import Card from "../Card/Card";

const bg = [
  {
    name: "HooHoop",
    description:
      "HooHoop is the first company in NZ to offer this 360 virtual experience and by doing so saves plenty of time.",
    image: hoohoop,
  },
  {
    name: "Pracify",
    description:
      "Pracify helps companies scale on-demand by connecting them to a network of selected and trained gig workers for performing easily doable task-based jobs on a pay-per-performance system.",
    image: pracify,
  },
  {
    name: "IOSD",
    description:
      "IOSD helps student's in improving there coding skills by building open source projects and teaching programming concepts",
    image: iosd,
  },
  {
    name: "Monktree",
    description:
      "Monktree improves student's education quality from stationary to learning, from internship to Placement.",
    image: monktree,

  },
];
function Internship(props) {
  const createSlides = () => {
    return bg.map((cur, index) => <Card data={cur} />);
  };
  return <div className="internships">{createSlides()}</div>;
}

export default Internship;
