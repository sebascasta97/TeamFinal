import  React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../img/logo.png';

function Menu()
{
        return(
            <>
            {
             <ul className="MenuContainer">
                   <Link to={'/'}>
                    <li  className="itemMenuLogo">                           
                    </li >
                    </Link> 
                    <Link to={'/employees'}>
                    <li   className="itemMenu">
                    <span>Employees</span>
                    </li >
                    </Link>
                    <Link to={'/prizes'}>
                    <li  className="itemMenu">
                        <span>Prizes</span>
                    </li >
                    </Link>

                    <Link to={'/achievements'}>
                    <li   className="itemMenu">
                        <span>Achivements</span>
                    </li >
                    </Link>
                    <Link to={'/employees'}>
                    <li   className="itemMenu navRight">
                        <span>Profile</span>
                    </li >
                    </Link>
                    <Link to={'/employees'}>
                    <li   className="itemMenu navRight">
                        <span>Logout</span>
                    </li >
                    </Link>
                   
            </ul>
            

        }
        </>
        );
   

}

export default Menu;

