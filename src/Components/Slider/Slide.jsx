import React from 'react';

function Slide({children,style,className,slidesPerScreen}) {
    return (
        <div 
            style={{...style,minWidth:`calc(100% / ${slidesPerScreen})`}} 
            className={className}
        >
                {children}
        </div>
    );
}

export default Slide;