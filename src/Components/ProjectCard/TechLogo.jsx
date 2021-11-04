import React from "react";
import { useInView } from 'react-intersection-observer';

function TechLogo({logo, alt}) {
  const [ logoRef, logoInView ] = useInView({threshold:0.5});
  
  return (
    <div ref={logoRef} className={`project__icon__container ${logoInView ? "outwards" : ""}`}>
      <img src={logo} className="project__icon" alt={alt} />
    </div>
  );
}

export default TechLogo;
