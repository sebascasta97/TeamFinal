import React,{ } from 'react';

function Employee({  imgSrc, name,points})
{
    return(
        <>
            <div>
                <h1>{name}</h1>
                <img src={imgSrc} alt=""></img>
                <strong>{points}</strong>
                <label>*</label>
            </div>
            
        </>
    );
}