import React,{ } from 'react';

function Employee({  imgSrc, name,points})
{
    return(
        <>
           <div className="flip-card">
             <div className="flip-card-inner">
              <div className="flip-card-front">
              <img className="imgRadio"  src={imgSrc} alt="Img Employe"></img>
              <h1>{name}</h1> 
              </div>
              <div className="flip-card-back">   
                <strong>{points}</strong>
                <label>*</label>
              </div>  
             </div>
            </div>
            
        </>
    );
}
export default Employee;