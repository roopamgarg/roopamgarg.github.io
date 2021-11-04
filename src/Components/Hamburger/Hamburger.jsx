import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from 'gsap';
import { Lazy } from "react-is";
import LazyImage from "../LazyLoadImage";
import { character2, roopamImg2 } from "../../Assets";
const Hamburger = ({state}) => {
  
  let menu = useRef(null);
  let revealMenu = useRef(null);
  let revealMenuBackground = useRef(null);
  let cityBackground = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  //let info = useRef(null);

  useEffect(() => {
    if(state.clicked === false){
      // close our menu
      gsap.to([revealMenu, revealMenuBackground], {
        duration: 0.8,
        height:0,
        ease: "power3.inOut",
        stagger: {
          amount: 0.07
        }
      })
      gsap.to(menu, {
        duration: 1,
        css: {display:"none"}
      })
    }else if(state.clicked === true || state.clicked === true && state.initial == null){
      // open our menu
      
      gsap.to(menu, {
        duration: 0,
        css: {display:"block"}
      })
      gsap.to([revealMenu,revealMenuBackground], {
        duration: 0,
        opacity:1,
        height:"100%"
      })
      staggerReveal(revealMenuBackground,revealMenu);
      // fadeInUp(info)
      staggerText(line1,line2,line3);
    }
  },[state])

  const staggerReveal = (node1,node2) => {
    gsap.from([node1,node2], {
      duration: 0.8,
      height: 0,
      transformOrigin:"right top",
      skewY: 2,
      ease: "power3.inOut",
      stagger: {
        amount: 0.1
      }
    })
  }

  const staggerText = (node1,node2,node3) => {
    gsap.from([node1,node2,node3], {
      duration: 0.8,
      y: 100,
      delay: .1,
      ease: "power3.inOut",
      stagger: {
        amount: 0.3
      }
    })
  }

  const fadeInUp = (node) => {
    gsap.from(node, {
      y: 60,
      duration: 1,
      delay:0.2,
      opacity:0,
      ease:"power3.inOut"
    })
  }
  return <div ref={el => menu = el} className='hamburger-menu'>
    <div ref={el => {revealMenuBackground = el}} className="menu-secondary-background-color"></div>
    <div ref={el => {revealMenu = el}} className="menu-layer">
      <div className="menu-city-background">

      </div>
      <div className="container">
        <div className="wrapper">
          <div className="menu-links">
            <nav>
              <ul>
                <li><Link ref={el => line1 = el} to="/projects">Projects</Link></li>
                <li><Link ref={el => line2 = el} to="/internship">Internships</Link></li>
                <li><Link ref={el => line3 = el} to="/education">Education &<br/> Communities</Link></li>
             
              </ul>
            </nav>

            <div className="info">
                  
              <div className="hamburger-image">
                <LazyImage width="100%"  src={character2} alt="roopam"/>

              </div>       
            </div>
            <div className="locations">
              Email me @ 
              <span>roopamg777@gmail.com</span>
            
            </div>
          </div> 
        </div>
      </div>
    </div>
  </div>;
};

export default Hamburger;
