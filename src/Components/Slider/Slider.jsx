import React, {useState,useRef,useEffect} from 'react';
import Prev from "../../Assets/icons/prev.svg";
import Next from "../../Assets/icons/next.svg";

function Slider({children,noOfSlides, slidesPerScreen,startWith}) {

    const [currentSlide,setSlide] = useState(startWith || 0)
    const ref = useRef();
    if(noOfSlides <= 0 || startWith < 0 || startWith >= noOfSlides || slidesPerScreen <= 0) {
        throw Error("Invalid props given to slider")
    }
    let curPos = 0;
    let isRight = true;
  
    useEffect(() => {
        goToSlide(currentSlide);
    },[])
    
    const scrollRight = () => {
        isRight = true;
        ref.current.scroll({
            top: 0,
            left: ref.current.scrollLeft + ((ref.current.offsetWidth / 100) * 1 ),
        })

    }
    const scrollLeft = () => {
        isRight = false;
        ref.current.scroll({
            top: 0,
            left: ref.current.scrollLeft - ((ref.current.offsetWidth / 100) * 1),
        })
    }
    const handleSlide = (e) => {
        console.log(e)
        if(e.deltaX){
            if(0 < (e.deltaX)){
                //curPos = (e.deltaX);
                scrollRight()
            }else{
                //curPos = (e.deltaX);
                scrollLeft();

            }
        }else{
            if(curPos > (e.touches[0].clientX)){
                curPos = (e.touches[0].clientX);
                scrollRight()
            }else{
                curPos = (e.touches[0].clientX);
                scrollLeft();
            }
        }
        
    }
    const goToSlide = (index) => {
        console.log(index)
            ref.current.scroll({
                top: 0,
                left: (ref.current.offsetWidth / slidesPerScreen) * (index),
                behavior: 'smooth'
            })
            setSlide(index)

    }
    const handleSlideEnd = (e) => {
        if(isRight){
            goToSlide(currentSlide + 1 % noOfSlides);
        }else{
            if(currentSlide > 0){
                goToSlide(currentSlide - 1);
            }
        }
    }
    function debounce(fn, delay) {
        let timer = null;
        return function(e) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn(e)
            }, delay);
        }
    }
    function checkWheelEnd(fn,delay) {
         let timer = null;
        return function(e) {
            fn(e)
            clearTimeout(timer);
            timer = setTimeout(() => {
                    handleSlideEnd();
            }, delay);
        }
    }
    return (
        <div className="slider__container">
            {/* <div className="slider__side-buttons prev" onClick={()=> goToSlide(currentSlide > 0 ? currentSlide - 1 : noOfSlides - 1)}>
                <img src={Prev} alt="prev"/>
            </div>
            <div className="slider__side-buttons next" onClick={() => goToSlide((currentSlide + 1) % noOfSlides)} >
                <img src={Next} alt="next"/>
            </div> */}
            {/* <div className="slider__dots">
                {
                    new Array(noOfSlides).fill(0).map((val,index) => (
                        <div className={`slider__dot ${index === currentSlide ? "transparent" : ""}`} onClick={() => goToSlide(index)}></div>
                    ))
                }
            </div>   */}

        <div 
            ref={ref} 
            className="slider"  
            onTouchMove={debounce(handleSlide,10)} 
            onTouchEnd={debounce(handleSlideEnd,200)}
            onWheel={checkWheelEnd(handleSlide,250)} 

        >

            {children}
        </div>
        </div>
    );
}

export default Slider;