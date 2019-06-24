import React,{ Component} from 'react';
import { BASE_LOCAL_ENDPOINT } from '../constants';
import Employee from '../components/employee';
import axios from 'axios';
import {Link} from 'react-router-dom';

class ListEmployees extends Component
{
   constructor(props)
   {
        super(props);
        this.state=
        {
            employees: {
                content: [],
                error: false
            }
        }
   }

   componentDidMount = () => 
   {
        this.getEmployes();
   }


   getEmployes= ()=>
   {
    axios.get(`${BASE_LOCAL_ENDPOINT}/employees`)
    .then(information => {
        this.setState({
            employees: {
                content: information.data,
                error: ''
            },
            createEmployeesError: false
        })
    })
    .catch(error => {
        this.setState({
            employees: {
                error: error.message
            }   
        })
    })
   }

   render() { 
    const {
        employees: { content, error }
    } = this.state;

    if (error!=="") {
        return <div>No se pudo conectar con el servidor: {error}</div>
    }
    return (
                <>  
                <input name="txtSearchEmployee" placeholder="buscar empleado"/>
                    {content.map(({ id, imgSrc, name,points }) => (
                        <Link key={id} to={`/employees/${id}`}>

                        <Employee  key={id} imgSrc={imgSrc} name={name} points={points}/>
                        </Link>
                    ))}
                </>
            );
    }
}

export default ListEmployees;