import React,{ Component} from 'react';
import { BASE_LOCAL_ENDPOINT } from '../constants';
import Achievement from '../components/Achievements';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import {Link} from 'react-router-dom';

class ListAchievement extends Component
{
   constructor(props)
   {
        super(props);
        this.state=
        {   
            modal: false,
            achievements: {
                content: [],
                error: false
            },
            filterAchievement:""
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
        this.getAchievements();
   }


   getAchievements= ()=>
   {
    axios.get(`${BASE_LOCAL_ENDPOINT}/achievements`)
    .then(information => {
        this.setState({
            achievements: {
                content: information.data,
                error: ''
            }
           
        })
    })
    .catch(error => {
        this.setState({
            achievements: {
                error: error.message
            }   
        })
    })
   }

   searchAchievement=(e)=>
   {
       const filtertext=e.target.value;
       console.log(filtertext);
       this.setState({ "filterAchievement": filtertext })
    
   }

   PostAchievements=(e)=>
   {
        const datos=e.target.children;
        
        const Achievement=
        {
            "name": datos[0].value,
            "points": datos[1].value
        }
        axios.post(`${BASE_LOCAL_ENDPOINT}/achievements`,Achievement);
   }

   changeAchievement=(e,id)=>
    {
        const datos=e.target.children;

        const changeAchievement=
        {
            

                "name": datos[1].value,
                "points": datos[3].value,

        }
        axios.put(`${BASE_LOCAL_ENDPOINT}/achievements/${id}`,changeAchievement)
        .then(
            setTimeout(200,window.location.reload())
            )
    }

    deleteAchievement=(id)=>
    {
        axios.delete(`${BASE_LOCAL_ENDPOINT}/achievements/${id}`)
        .then(()=>window.location.reload())
       
    }
    mostrar(id)
    {
        
        document.getElementsByClassName("FormDetail"+id)[0].className="FormDetail animated  fadeInDown";
    }
   render() { 
    const {
        achievements: { content, error },
        filterAchievement
    } = this.state;
    const filterAchievements =content.filter(Achievement => Achievement.name.includes(filterAchievement));

    if (error!=="") {
        
        return <div>No se pudo conectar con el servidor: {error}</div>
    }

    return (
    <>

            <input  className="buscarAchievement" name="SearchAchievement" placeholder="Search Achievement" onChange={(e) => this.searchAchievement(e)}/>
            <Button className="btnCrear2" color="danger" onClick={this.toggle}>Create{this.props.buttonLabel}</Button>
             <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} className="crearEmployee animated bounce" >
              <ModalHeader toggle={this.toggle}>CREATE A NEW ACHIEVEMENT </ModalHeader>
              <ModalBody>


                  
             
              <form  onSubmit={(e)=>this.PostAchievements(e)}>
                    <input className="campos" placeholder="Name"></input>
                    <input className="campos" placeholder="Points"></input>
                    <button className="btnCrear" type="submit">Create</button>
              </form> 

             </ModalBody>
            </Modal>

 

               
                <div className="containerEmployees"> 
                {console.log(error)}        
                    {filterAchievements.map(({ id,name,points }) => (
                        <div  key={id}>   
                            <Achievement name={name} points={points}/>  
                            <button  onClick={()=>this.deleteAchievement(id)}>Delete</button>
                            <button  onClick={()=>this.mostrar(id)}>Change</button>
                            
                            <form  className={`FormDetail${id} ocultar `} onSubmit={(e)=>this.changeAchievement(e,id)}>
                                <label className="LabelFormAchivements">Name:</label>
                                <input className="InputFormAchivements" placeholder="Name" defaultValue={name}></input>
                                <label className="LabelFormAchivements">Points:</label>
                                <input className="InputFormAchivements" placeholder="Points" defaultValue={points}></input>
                                <button className="btn-Change btn" type="submit">Change</button>
                            </form>  
                            
                            
                        </div>
                                           
                    ))}
                    </div>
                </>
            );
    }
}

export default ListAchievement;