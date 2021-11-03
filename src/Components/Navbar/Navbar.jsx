import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Hamburger from "../Hamburger/Hamburger";
import useWindowSize from "../../Hooks/useWindowSize";


const Navbar = ({ children }) => {
  // HOOK
  const size = useWindowSize();

  // REF
  const app = useRef();
  const scrollContainer = useRef();

  const skewConfigs = {
    ease: 0.2,
    current: 0,
    previous: 0,
    rounded: 0,
  };
  useEffect(() => {
    
    setInterval(() => {
      document.body.style.height = `${
        scrollContainer.current.getBoundingClientRect().height
      }px`;
    },1000)
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => skewScrolling());
  }, []);
  const skewScrolling = () => {
    skewConfigs.current = window.scrollY;
    skewConfigs.previous +=
      (skewConfigs.current - skewConfigs.previous) * skewConfigs.ease;
    skewConfigs.rounded = Math.round(skewConfigs.previous * 100) / 100;

    // variables
    const difference = skewConfigs.current - skewConfigs.rounded;
    const acceleration = difference / size.width;
    const velocity = +acceleration;
    const skew = velocity * 7.5;

    scrollContainer.current.style.transform = `translate3d(0, -${skewConfigs.rounded}px, 0) skewY(${skew}deg)`;

    requestAnimationFrame(() => skewScrolling());
  };

  const [state, setState] = useState({
    initial: false,
    clicked: null,
    menuName: "Menu",
  });
  const [disabled, setDisabled] = useState(false);

  const history = useHistory();
  // use effect for page changes
  useEffect(() => {
    history.listen(() => {
      setState({ clicked: false, menuName: "Menu" });
      
      //console.log(history.location)
    });
  });
  useEffect(() => {
    console.log(scrollContainer.current.getBoundingClientRect().height)
    document.body.style.height = `${
      scrollContainer.current.getBoundingClientRect().height
    }px`;
  }, [history.location])
  const handleMenu = () => {
    disableMenu();
    if (state.initial === false) {
      setState({
        initial: null,
        clicked: true,
        menuName: "Close",
      });
    } else if (state.clicked == true) {
      setState({
        clicked: !state.clicked,
        menuName: "Menu",
      });
    } else if (state.clicked == false) {
      setState({
        clicked: !state.clicked,
        menuName: "Close",
      });
    }
  };

  // Determine if our menu button should be disabled
  const disableMenu = () => {
    setDisabled(!disabled);
    setTimeout(() => {
      setDisabled(false);
    }, 1200);
  };
  return (
    <>
      <header>
        <div className="container">
          <div className="wrapper">
            <div className="inner-header">
              <div className="logo">
                <Link to="/">RG.</Link>
              </div>
              <div className="menu">
                <button disabled={disabled} onClick={handleMenu}>
                  Menu
                </button>
              </div>
            </div>
          </div>
        </div>
        <Hamburger state={state} />
      </header>

      <div ref={app} className="App">
        <div ref={scrollContainer}>
          <div className={`${history.location.pathname !== "/" ? "divider-4" : ""}`}></div>
          {children}</div>
      </div>
    </>
  );
};

export default Navbar;
