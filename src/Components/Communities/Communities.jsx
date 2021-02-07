import React from 'react';
import iosd from "../../images/iosd.png";
import dsc from "../../images/dsc.png";
import minitroika from "../../images/minitroika.png";
import Card from '../Card/Card';
const data = [

  {
    name: "DSC",
    description:
      "IOSD helps student's in improving there coding skills by building open source projects and teaching programming concepts",
    image: dsc,
  },
  {
    name: "IOSD",
    description:
      "IOSD helps student's in improving there coding skills by building open source projects and teaching programming concepts",
    image: iosd,
  },

  {
    name: "Mini Troika",
    description:
      "IOSD helps student's in improving there coding skills by building open source projects and teaching programming concepts",
    image: minitroika,
  },
];
function Communities(props) {
  const createSlides = () => {
    return data.map((cur, index) => <Card data={cur} />);
  };
  return (
    <div className="internships-section">
    <div className="heading-primary">Communities</div>

    <div className="internships">
    {createSlides()}
    </div>
    </div>
  );
}

export default Communities;