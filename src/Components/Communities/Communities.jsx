import React from 'react';
import { dscLogo, iosdLogo } from '../../Assets';
import data from '../../data';

import Card from '../Card/Card';

function Communities(props) {
  const createSlides = () => {
    return data.communities.map((cur, index) => <Card data={cur} />);
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