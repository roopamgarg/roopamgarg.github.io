import React from "react";
import { hoohoop, hoohoopLogo, iosd, iosdLogo, monktree, monktreeLogo, pracify, pracifyLogo } from "../../Assets";
import data from "../../data";
import Card from "../Card/Card";

function Internship(props) {
  const createSlides = () => {
    return data.internships.map((cur, index) => <Card data={cur} />);
  };
  return (
    <div className="internships-section">
    <div className="heading-primary">Internships</div>

    <div className="internships">
    {createSlides()}
    </div>
    </div>
  )
}

export default Internship;
