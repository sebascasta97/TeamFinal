import React from 'react';


function Prize({name,imgSrc,points})
{
 return(
    <>
        <div className='container-prize'>
            <h1>{name}</h1>
            <img src={imgSrc}/>
            <strong>{points} estrellas</strong>
            
        </div>
    </>
 );
}

export default Prize;