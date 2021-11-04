import React, { useEffect, useRef, useState } from "react";
import gsap, { Power2 } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import { character } from "../../Assets";
import { motion } from "framer";
import LazyImage from "../LazyLoadImage";
function Header(props) {
  let image = useRef(null);
  let container = useRef(null);

  const imageReveal = CSSRulePlugin.getRule(".header__box:after");
  const tl = new gsap.timeline();
  // useEffect(() => {
  //   tl.to(container, 0, { css: { visibility: "visible" } });
  //   tl.to(imageReveal, 1.4, { width: "0%", ease: Power2.easeInOut });
  //   tl.from(image, 1.4, {
  //     scale: 1.6,
  //     ease: Power2.easeInOut,
  //     delay: -1.4
  //   });
  // },[]);
  return (
    <div className="header">
      <div className="header__left">
        <div className="header__sub-heading">Hello 👋 I am</div>
        <div className="heading">
          Roopam <br />
          Garg
        </div>
      </div>
      <div className="header__right">
        <motion.div
          initial={{ scale: 0.2 }}
          animate={{
            scale: 1,
            transition: {
              duration: 1,
              type: "spring",
              stiffness: 100,
            },
          }}
          ref={(el) => (container = el)}
          className="header__box"
        >
          <LazyImage ref={(el) => (image = el)} width="100%" src={character} />
        </motion.div>
      </div>
    </div>
  );
}

export default Header;
