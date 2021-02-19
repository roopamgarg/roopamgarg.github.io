import React, { useEffect, useRef, Suspense, lazy } from "react";
import Header from "../Components/Header/Header.jsx";
import Projects from "../Components/Projects/Projects";

import Education from "../Components/Education/Education.jsx";
import Internship from "../Components/internships/Internship";
import Communities from "../Components/Communities/Communities.jsx";
// const Education = lazy(() => import("../Components/Education/Education.jsx"));
// const Internship = lazy(() => import("../Components/internships/Internship"));
// const Communities = lazy(() => import("../Components/Communities/Communities.jsx"));
function Home(props) {
  return (
    <>
        <Header />
        <Projects />
        <div style={{ padding: "4rem" }}></div>
        <Internship />
        <Education />
        <Communities />
    </>
  );
}

export default Home;
