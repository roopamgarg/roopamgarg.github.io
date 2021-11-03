import React, { useRef } from "react";
import {
  mongodbLogo,
  nodejsLogo,
  reactjsLogo,
  reduxLogo,
  firebaseLogo,
  awsLogo,
  nginxLogo,
} from "../../Assets";
import LazyImage from "../LazyLoadImage";
import { motion, useAnimation } from "framer";
export const zoomInVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 100,
    },
  },
};

const ProjectCard = ({ index, image, name, points, techstack, bgColor }) => {
  const intersectionRef = useRef(null);
  const container = useRef(null);
  const imageControls = useAnimation();
  const containerControls = useAnimation();

  function handleCardHover() {
    console.log("hello")
    containerControls.start({
      opacity:1
    })
    imageControls.start({
      x: 0,
      y: 0,
      scale:1,
      opacity: 1,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 100,
      },
    });
  }

  function handleCardHoverEnds(isRight) {
    // containerControls.start({
    //   opacity:0
    // })
    // imageControls.start({
    //   y: 100,
    //   scale:0.8,
    //   opacity: 0,
    //   transition: {
    //     duration: 0.2,
    //     type: "spring",
    //     stiffness: 100,
    //   },
    // });
  }

  const renderImage = (isRight) => {
    return (
      <motion.div
        animate={imageControls}
        initial={{ scale:0.8,y: 100, opacity: 0 }}
      >
        <LazyImage style={{ width: "100%" }} src={image} alt="poll" />
      </motion.div>
    );
  };
  return (
    <motion.div
      onMouseEnter={() => {
        handleCardHover();
      }}
      onMouseLeave={() => {
        handleCardHoverEnds(index % 2 === 0 );
      }}
      onT={() => {
        handleCardHover();
      }}
      ref={intersectionRef}
      id={`project-${index}`}
      className={`project ${index % 2 === 0 ? "left" : "right"}`}
    >
      <motion.div
        animate={containerControls}
        initial={{opacity:0}}
        ref={container}
        className="project__image"
        style={{ background: bgColor || "#FF0075" }}
      >
        {renderImage(index % 2 === 0)}
      </motion.div>

      <div className="project__content">
        <div className="project__name">{name}</div>
        {points.map((point) => (
          <div className="project__point">{point}</div>
        ))}
        <div className="project__icons">
          {techstack.map(({ logo, alt }) => (
            <img src={logo} className="project__icon" alt={alt} />
          ))}
          {/* <img src={nodejsLogo} className="project__icon" alt="node js"/>
          <img src={mongodbLogo} className="project__icon" alt="mongo db"/>
          
          <img src={reduxLogo} className="project__icon" alt="redux"/>
          <img src={firebaseLogo} className="project__icon" alt="firebase"/>
          <img src={awsLogo} className="project__icon" alt="aws"/> */}
        </div>
      </div>
    </motion.div>
  );
};
export default ProjectCard;
