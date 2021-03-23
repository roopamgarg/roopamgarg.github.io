import React from "react";
import { hoohoop, iosd, monktree, poll, pracify } from "../../Assets";
import data from "../../data";
import ProjectCard from "../ProjectCard/ProjectCard";

function Projects(props) {
  return (
    <div className="projects" id="projects">
      <div className="heading-primary">Projects</div>
      {data.projects.map(({ image, points, name, techstack }, index) => (
        <ProjectCard index={index} image={image} points={points} name={name} techstack={techstack} />
      ))}
    </div>
  );
}

export default Projects;
