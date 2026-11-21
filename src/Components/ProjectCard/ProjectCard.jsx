import React, { useRef } from "react";
import { mongodbLogo, nodejsLogo, reactjsLogo,reduxLogo, firebaseLogo,awsLogo, nginxLogo } from "../../Assets";
import LazyImage from "../LazyLoadImage";

const ProjectCard = ({ index, image, name, points, techstack }) => {
  const intersectionRef = useRef(null);
  const container = useRef(null);

  const renderImage = () => {
    return <LazyImage style={{width:"100%"}} src={image} alt="poll" />;
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
        <div className="project__icons">
          {
            techstack.map(({logo,alt}) => (
              <img src={logo} className="project__icon" alt={alt}/>
            ))
          }
          {/* <img src={nodejsLogo} className="project__icon" alt="node js"/>
          <img src={mongodbLogo} className="project__icon" alt="mongo db"/>
          
          <img src={reduxLogo} className="project__icon" alt="redux"/>
          <img src={firebaseLogo} className="project__icon" alt="firebase"/>
          <img src={awsLogo} className="project__icon" alt="aws"/> */}

        </div>

      </div>
    </div>
  );
};
export default ProjectCard;
