import gsap, { TimelineLite, Power2 } from "gsap";

import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Education from "./Components/Education/Education";
import Internship from "./Components/internships/Internship";
import Navbar from "./Components/Navbar/Navbar";
import Projects from "./Components/Projects/Projects";
import EducationPage from "./Pages/Education";
import Home from "./Pages/Home";
import "./Styles/index.scss";

function App() {
  useEffect(() => {
    gsap.registerPlugin(Power2, TimelineLite);
  },[]);
  return (
    <BrowserRouter>
      <div>
        <Navbar>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/education" component={EducationPage} />
            <Route exact path="/internship" component={Internship} />

          </Switch>
        </Navbar>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
