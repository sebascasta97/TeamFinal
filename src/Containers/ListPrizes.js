import React ,{ Component} from 'react';
import { BASE_LOCAL_ENDPOINT } from '../constants';
import Prize from '../components/Prize';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Button } from 'reactstrap';


class ListPrizes extends Component
{
   constructor(props)
   {
        super(props);
        this.state=
        {   
            modal: false,
            prizes: {
                content: [],
                error: false
            },
            filterPrize:""
            

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
        this.getprizes();
   }

   searchPrizes=(e)=>
   {
       const filtertext=e.target.value;
       console.log(filtertext);
       this.setState({ "filterPrize": filtertext })
    
   }
   PostPrize= (e)=>
   {
       e.preventDefault();
       console.log("el valor es");
       console.log(e.target.children);
      const datos=
      {
        "name": e.target.children[0].value,
		"description":  e.target.children[1].value,
		"points":  e.target.children[2].value,
		"imgSrc":  e.target.children[3].value
      }
       
       axios.post(`${BASE_LOCAL_ENDPOINT}/prizes`,datos)
       .then(()=>window.location.reload())
   }

   getprizes= ()=>
   {
    axios.get(`${BASE_LOCAL_ENDPOINT}/prizes`)
    .then(information => {
        const arrayPrizes=information.data.sort(function(previous,next)
        {
            return previous.points-next.points;
        })
        this.setState({
            prizes: {
                content: arrayPrizes,
                error: ''
            }
            
        })
    })
    .catch(error => {
        this.setState({
            prizes: {
                error: error.message
            }   
        })
    })
   }
   mostrarCreate()
    {
        document.getElementsByClassName("FormCreate")[0].className="FormCreate animated  fadeInDown";
        
    }

   render() { 
    const {
        prizes: { content, error},
        filterPrize
    } = this.state;
    console.log("el filter tiene"+filterPrize)
    const filteredPrizes =content.filter(prize => prize.name.includes(filterPrize));
   
        
    

    if (error!=="") {
        return <div>No se pudo conectar con el servidor, por favor intentelo nuevamente: {error}</div>
    }

    else
    {

    }
    return (
        <>
            <input className="buscarEmpleado" name="txtSearchPrize" placeholder="Search a Prize" onChange={(e) => this.searchPrizes(e)}/>



            <div >
             <Button className="btnCrear2" color="danger" onClick={()=>this.mostrarCreate()}>Add{this.props.buttonLabel}</Button>
             
             
                <form className="FormCreate ocultar"  onSubmit={(e)=>this.PostPrize(e)}>
                        <input className="campos" type="text"  placeholder="name"/>
                        <input className="campos" type="text" placeholder="Descripcion"/>
                        <input className="campos" type="number" placeholder="points"/>
                        <input className="campos" type="text"  placeholder="url-img"/>
                        <button className="btn-Change CentrarBtn"  type="submit">Add</button>  
                </form>  
              
           </div>

           <div className="containerEmployees">
             {filteredPrizes.map(({ id, imgSrc, name,points}) => (
                <Link key={id} to={`/prizes/${id}`}>

                <Prize  key={id} imgSrc={imgSrc} name={name} points={points}/>
                </Link>
                ))}
            </div>
        </>
            );
    }
}

export default ListPrizes;