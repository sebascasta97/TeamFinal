import React,{ } from 'react';
import estrella from '../img/patricio.webp';

/*const StyleContainer= styled.figure
  "background-color:"+Color;
  color: black;
  border-radius: 20px;
  color: white;
;*/


function Employee({  imgSrc, name,points})
{
  
  const ArrayColors=["color-purple","color-aqua","color-ClearBlue","color-yellow","color-orange","color-pink"];
    return(
        <>
        
           <div className="flip-card">
             <div className="flip-card-inner">
              <div className={`flip-card-front ${ArrayColors[Math.round(Math.random()*(ArrayColors.length-1))]}`}>
              <img className="imgRadio"  src={imgSrc} alt="Img Employe"></img>
              <h1>{name}</h1> 
              </div>
              <div className="flip-card-back">
                  
                <strong className="numero">{points}</strong>
                <img className="patricio"  src={estrella} alt="Img Employe"></img>
              </div>  
             </div>
            </div>
           
            
        </>
    );
}
export default Employee;