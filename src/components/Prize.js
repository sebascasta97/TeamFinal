import React from 'react';
import cangrejo from '../img/cangrejo.png';

function Prize({name,imgSrc,points})
{
const ArrayColors=["color-purple","color-aqua","color-ClearBlue","color-yellow","color-orange","color-pink"];
 return(
    <>  

         <div className="flip-card">
             <div className="flip-card-inner">
              <div className={`flip-card-front ${ArrayColors[Math.round(Math.random()*(ArrayColors.length-1))]}`}>
              <img className="imgRadioP" src={imgSrc} alt="Img Prize"/>
              <h1>{name}</h1> 
              </div>
              <div className="flip-card-back">
                  
                <strong className="numero">{points}</strong>
                <img className="patricio"  src={cangrejo} alt="Img Employe"></img>
              </div>  
             </div>
         </div>
    </>
 );
}

export default Prize;