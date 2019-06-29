import React,{ Component} from 'react';
import { BASE_LOCAL_ENDPOINT } from '../constants';
import Employee from '../components/employee';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class ListEmployees extends Component
{
   constructor(props)
   {
        super(props);
        this.state=
        {   
            modal: false,
            employees: {
                content: [],
                error: false
            },
            filterEmployee:""
        };
        this.toggle = this.toggle.bind(this);

   }


   toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

   

   componentDidMount = () => 
   {
        this.getEmployes();
   }

   searchEmploye=(e)=>
   {
       const filtertext=e.target.value;
       console.log(filtertext);
       this.setState({ "filterEmployee": filtertext })
    
   }

   PostEmploye= (e)=>
   {
        const datos=e.target.children;
        const Employee=
        {
            "name": datos[0].value,
		    "job":  datos[1].value,
            "area":  datos[2].value,
            "imgSrc":  datos[3].value,
		    "points":  datos[4].value
            
        }
        axios.post(`${BASE_LOCAL_ENDPOINT}/employees`,Employee)
        .then(()=>window.location.reload())
   }

   getEmployes= ()=>
   {
    axios.get(`${BASE_LOCAL_ENDPOINT}/employees`)
    .then(information => {
        const arrayEmployee=information.data.sort(function(previous,next)
        {
            return next.points-previous.points;
        })
        this.setState({
            employees: {
                content: arrayEmployee,
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
        employees: { content, error },
        filterEmployee
    } = this.state;
    console.log(content);
    const filteredEmployee =(content!==undefined)?content.filter(Employee => Employee.name.includes(filterEmployee)):"";
    if (error!=="" || filteredEmployee==="") {
        return <div>No se pudo conectar con el servidor: {error}</div>
    }
    else
    {
        return (
            <>
            <input className="buscarEmpleado" name="txtSearchEmployee" placeholder="Buscar Empleado" onChange={(e) => this.searchEmploye(e)}/>
            <div >
             <Button className="btnCrear2" color="danger" onClick={this.toggle}>Create{this.props.buttonLabel}</Button>
             <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} className="crearEmployee animated bounce" >
              <ModalHeader toggle={this.toggle}>CREATE A NEW EPLOYEE </ModalHeader>
              <ModalBody>


                  
             
             <form  onSubmit={(e)=>this.PostEmploye(e)}>
                <input className="campos" type="text" placeholder="Name"></input>
                <input className="campos" type="text" placeholder="Job"></input>
                <input className="campos" type="text" placeholder="Work Area"></input>
                <input className="campos" type="text" placeholder="Url-image"></input>
                <input className="campos" type="number" placeholder="Points"></input>
                <button className="btnCrear" type="submit">Create</button>
                
            </form>  

          </ModalBody>
        </Modal>
      </div>
            
  
               <div className="containerEmployees">
                {filteredEmployee.map(({ id, imgSrc, name,points }) => (
                    <Link key={id} to={`/employees/${id}`}>

                    <Employee  key={id} imgSrc={imgSrc} name={name} points={points}/>
                    </Link>
                ))}
              </div>
            </>
        );
    }
    
    }
}

export default ListEmployees;