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

   PostEmploye= (e)=>
   {
        const datos=e.target.children;
        const Employee=
        {
            "name": datos[0].value,
		    "job":  datos[1].value,
		    "area":  datos[2].value,
		    "points":  datos[3].value,
            "imgUrl":  datos[4].value
        }
        axios.post(`${BASE_LOCAL_ENDPOINT}/employees`,Employee);
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
                <form  onSubmit={(e)=>this.PostEmploye(e)}>
                    <input type="text" placeholder="Name"></input>
                    <input type="text" placeholder="Job"></input>
                    <input type="text" placeholder="Work Area"></input>
                    <input type="text" placeholder="Url-image"></input>
                    <input type="number" placeholder="Points"></input>
                    <button type="submit">Create</button>
                </form>    
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