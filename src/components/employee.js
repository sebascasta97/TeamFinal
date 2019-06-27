import React,{ } from 'react';

function Employee({  imgSrc, name,points})
{
    return(
        <>
            <div>
                <h1>{name}</h1>
                <img src={imgSrc} alt="Img Employe"></img>
                <strong>{points}</strong>
                <label>*</label>
            </div>
            
        </>
    );
}
export default Employee;