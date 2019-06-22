import  React from 'react';
import {Link} from 'react-router-dom';

function Menu()
{
        return(
            <>
            {
             <ul className="MenuContainer">
                   <Link to={'/'}>
                    <li  className="itemMenu" >
                        <p>Team Int</p>
                    </li >
                    </Link> 
                    <Link to={'/employees'}>
                    <li   className="itemMenu">
                        <p>Employees</p>
                    </li >
                    </Link>
                    <Link to={'/prizes'}>
                    <li  className="itemMenu">
                        <p>Prizes</p>
                    </li >
                    </Link>

                    <Link to={'/achievements'}>
                    <li   className="itemMenu">
                        <p>archivements</p>
                    </li >
                    </Link>
                    <Link to={'/employees'}>
                    <li   className="itemMenu">
                        <p>Profile</p>
                    </li >
                    </Link>
                    <Link to={'/employees'}>
                    <li   className="itemMenu">
                        <p>Logout</p>
                    </li >
                    </Link>
                   
            </ul>
            

        }
        </>
        );
   

}

export default Menu;

