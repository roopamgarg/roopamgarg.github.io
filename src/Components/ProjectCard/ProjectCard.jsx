import React, { useRef } from "react";
import LazyImage from "../LazyLoadImage";

const ProjectCard = ({ index, image, name, points }) => {
  const intersectionRef = useRef(null);
  const container = useRef(null);

  const renderImage = () => {
    return <LazyImage  src={image} alt="poll" />;
  };
  return (
    <div
      ref={intersectionRef}
      id={`project-${index}`}
      className={`project ${index % 2 === 0 ? "left" : "right"}`}
    >
      <div ref={container} className="project__image">
        {renderImage()}
      </div>
      <div className="project__content">
        <div className="project__name">{name}</div>
        {points.map((point) => (
          <div className="project__point">{point}</div>
        ))}
      </div>
    </div>
  );
};
export default ProjectCard;
