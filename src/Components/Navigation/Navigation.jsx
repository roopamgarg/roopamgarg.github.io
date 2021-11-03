import React,{useState} from 'react';
import { MenuContainer, NavigationContainer, NavText, PageContainer } from './style';
import { Link } from "react-router-dom";


function Navigation({ children }) {
  const [showNav,setShowNav] = useState(false);
  return (
    <NavigationContainer onClick={() => setShowNav(!showNav)}>
      <PageContainer showOptions={showNav}>
        {children}
      </PageContainer>
      <MenuContainer showOptions={showNav}>
        <Link to="/"><NavText showOptions={showNav} delay={"0.1s"}>About me</NavText></Link>
        <Link to="/"><NavText showOptions={showNav} delay={"0.15s"}>Projects</NavText></Link>
        <Link to="/"><NavText showOptions={showNav} delay={"0.2s"}>Contact me</NavText></Link>
      </MenuContainer>
    </NavigationContainer>
  );
}

export default Navigation;