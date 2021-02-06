import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Styles/index.scss";
import Header from "./Components/Header/Header.jsx";
import Internship from "./Components/internships/Internship.jsx";
import useWindowSize from "./Hooks/useWindowSize";
import Projects from "./Components/Projects/Projects";

const App = () => {
      // HOOK
  const size = useWindowSize();

  // REF
  const app = useRef();
  const scrollContainer = useRef();

  const skewConfigs = {
    ease: .1,
    current: 0,
    previous: 0,
    rounded: 0
  }
  useEffect(() => {
    document.body.style.height = `${scrollContainer.current.getBoundingClientRect().height}px`
  },[size.height]);

  useEffect(() => {
    requestAnimationFrame(() => skewScrolling());
  },[])
  const skewScrolling = () => {
    skewConfigs.current = window.scrollY;
    skewConfigs.previous += (skewConfigs.current - skewConfigs.previous) * skewConfigs.ease;
    skewConfigs.rounded = Math.round(skewConfigs.previous * 100) / 100;
    
    // variables
    const difference = skewConfigs.current - skewConfigs.rounded;
    const acceleration = difference / size.width;
    const velocity = +acceleration;
    const skew = velocity * 7.5;

    scrollContainer.current.style.transform = `translate3d(0, -${skewConfigs.rounded}px, 0) skewY(${skew}deg)`
  
    requestAnimationFrame(() => skewScrolling());
  }
 
  return (
    <div ref={app} className='App'>

    <div ref={scrollContainer}>
        <Header />
        <Projects />
        <Header />

    </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
