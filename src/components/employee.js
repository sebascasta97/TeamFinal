import React,{ } from 'react';

function Employee({  imgSrc, name,points})
{
    return(
        <>
            <div className="Container-Employee">
                <h1>{name}</h1>
                <img src={imgSrc} alt=""></img>
                <strong>{points}</strong>
                <label>Estrellas</label>
            </div>
            
        </>
    );
}
export default Employee;