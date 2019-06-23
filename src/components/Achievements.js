import React from 'react';

function Achievement({name,points})
{
    return(
        
            <>
                <div className="containerAchievement">
                    <h1>{name}</h1>
                    <strong>{points}</strong>
                </div>
            </>
        
    );

}

export default Achievement;