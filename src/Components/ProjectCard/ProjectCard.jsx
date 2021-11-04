import React, { useRef,useState,useEffect } from "react";

import LazyImage from "../LazyLoadImage";
import { motion, useAnimation } from "framer";
import "regenerator-runtime/runtime";
import { useInView } from 'react-intersection-observer';
import TechLogo from "./TechLogo";

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

const ProjectCard = ({ key, index, image, name, points, techstack, bgColor }) => {
  const imageControls = useAnimation();
  const containerControls = useAnimation();
  const [isAnimationDone, setAnimationStatus] = useState(false);
  const [ intersectionRef, inView ] = useInView({threshold:0.5});

  function handleCardHover() {
    if (isAnimationDone) return;
    containerControls.start({
      opacity: 1,
    });
    imageControls.start({
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 100,
      },
    });
    setAnimationStatus(true);

  }

  async function handleCardHoverEnds(isRight) {
    await containerControls.start({
      opacity:0,
    })
    return await imageControls.start({
      y: 100,
      scale:0.8,
      opacity: 0,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 100,
      },
    });
  }

  const renderImage = (isRight) => {
    return (
      <motion.div
        animate={imageControls}
        initial={{ scale: 0.8, y: 100, opacity: 0 }}
      >
        <LazyImage style={{ width: "100%" }} src={image} alt="poll" />
      </motion.div>
    );
  };
  useEffect(() => {
    console.log(index,inView)
    if(inView){
      handleCardHover()
    }
  },[inView])
  return (
    <motion.div
      id={`project-${index}`}
      className={`project ${index % 2 === 0 ? "left" : "right"}`}
    >
      <motion.div
        animate={containerControls}
        ref={intersectionRef}
        initial={{ opacity: 0 }}
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
            <TechLogo logo={logo}  alt={alt}/>
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
