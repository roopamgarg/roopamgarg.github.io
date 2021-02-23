import React from "react";
import Header from "../Components/Header/Header.jsx";
import Projects from "../Components/Projects/Projects";
import Internship from "../Components/internships/Internship";
import Communities from "../Components/Communities/Communities.jsx";
function Home(props) {
  return (
    <>
        <Header />
        <Projects />
        <div style={{ padding: "4rem" }}></div>
        <Internship />
        <Communities />
    </>
  );
}

export default Home;
