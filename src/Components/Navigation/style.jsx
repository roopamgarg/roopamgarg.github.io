import styled from "styled-components";

export const NavigationContainer = styled.div`
  background: #36D1DC;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #5B86E5, #36D1DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  height: 100vh;
  width: 100vw;
  display: flex;
  perspective: 1500px;
  position: relative;

`

export const PageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: auto;
  background-color: #f7f7f7;
  transition: all 0.5s;
  transform: ${props => props.showOptions ? "translateZ(-1800px) translateX(-50%) rotateY(45deg)" : ""}; 
`

export const MenuContainer = styled.div`
  height: 100vh;
  position: absolute;
  right: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 
  a{

    display: block;
    color:#fff;
    font-size: 2rem;
    text-decoration: none;
  }
`

export const NavText = styled.span`
    display:${props => props.showOptions ? "block" : "none"};
    font-weight: 300;
    padding: 0.5rem 1rem;
    animation: fadeInRight 0.5s; 
    animation-fill-mode: backwards;
    animation-delay: ${props => props.delay};
`