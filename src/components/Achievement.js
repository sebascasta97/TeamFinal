import React,{ } from 'react'

function Achievement({name,points})
{
    return(
        <>
            <div className="Container-Prize">
                <h2>{name}</h2>
                <strong>{points} estrellas</strong>
            </div>
            
        </>
    );
}

export default Achievement;