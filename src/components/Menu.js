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
                        <a>Team Int</a>
                    </li >
                    </Link> 
                    <Link to={'/employees'}>
                    <li   className="itemMenu">
                        <a  className=" employees">Employees</a>
                    </li >
                    </Link>
                    <Link to={'/prizes'}>
                    <li  className="itemMenu">
                        <a>Prizes</a>
                    </li >
                    </Link>

                    <Link to={'/achievements'}>
                    <li   className="itemMenu">
                        <a>Archivements</a>
                    </li >
                    </Link>
                    <Link to={'/employees'}>
                    <li   className="itemMenu">
                        <a>Profile</a>
                    </li >
                    </Link>
                    <Link to={'/employees'}>
                    <li   className="itemMenu">
                        <a>Logout</a>
                    </li >
                    </Link>
                   
            </ul>
            

        }
        </>
        );
   

}

export default Menu;

