import React from 'react';


function Prize({name,imgSrc,points,description})
{
 return(
    <>
        <div className='container-prize'>
            <h1>{name}</h1>
            <img src={imgSrc}/>
            <strong>{points} estrellas</strong>
            <p>{description}</p>
        </div>
    </>
 );
}

export default Prize;