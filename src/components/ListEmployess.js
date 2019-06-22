import React,{ Component} from 'react';
import { BASE_LOCAL_ENDPOINT } from '../constants';

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


    return (
                <>  
                <input name="txtSearchEmployee" placeholder="buscar empleado"/>
                    {content.map(({ id, image, name,points }) => (
                        <Link key={id} to={`/employees/${id}`}>

                        <Detail  key={id} imgSrc={image} name={name} points={points}/>
                        </Link>
                    ))}
                </>
            );
    }
}

export default ListEmployees;