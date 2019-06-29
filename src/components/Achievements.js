import React from 'react';

function Achievement({name,points})
{

    
    const ArrayColors=["color-purple","color-aqua","color-ClearBlue","color-yellow","color-orange","color-pink"];
    return(
        
            <>

          <div className="flip-card-Achievement">
             
              <div className={`flip-card-front ${ArrayColors[Math.round(Math.random()*(ArrayColors.length-1))]}`}>
              <h1>{name}</h1>
              <strong className="numero">{points}</strong>              
                       
             </div>
            </div>

            </>
        
    );

}

export default Achievement;