import React,{ Component} from 'react';
import {BASE_LOCAL_ENDPOINT} from '../constants';
import axios from 'axios';
import estrella from '../img/estrella.png';
//import {Link,Redirect} from 'react-router-dom';
import estrellaa from '../img/patric.png';


class DetailsPrize extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            prize:
            {
                id: "",
                name: "",
                points: "",
                imgSrc: "",
                description: ""
            },
            error:""
            
        }
    }

    componentDidMount=()=>
    {
        
        const {match:{params: {id}}}=this.props;
        axios.get(`${BASE_LOCAL_ENDPOINT}/prizes/${id}`)
        .then(information =>
            {
                this.setState({
                   prize:information.data 
                })
            }
        )
        .catch(error=>
            {
                this.setState(
                    {
                        error: error.message   
                    })
            })
    }

    changePrize=(e,id)=>
    {
        const datos=e.target.children;
        //console.log("el id es"+id);

        const changePrize=
        {
            // se recorren los hijos de 2 en 2 debido a los labels
                "name": datos[1].value,
                "imgSrc": datos[3].value,
                "description": datos[5].value,
                "points": datos[7].value
               
        }
        axios.put(`${BASE_LOCAL_ENDPOINT}/prizes/${id}`,changePrize)
        .then(()=>window.location.reload())
    }

    deletePrize=(id)=>
    {
        axios.delete(`${BASE_LOCAL_ENDPOINT}/prizes/${id}`)
        .then(()=>this.props.history.push('/prizes'))
       
       
    }
    mostrar()
    {
        
        document.getElementsByClassName("FormDetail")[0].className="FormDetail animated  fadeInDown";
    }

    render()
    {
        const{
            prize,
            error
        }=this.state;

        console.log(prize);
        if(error!=="")
        {
            return <div className="nNetwork">
            <h1>No se pudo conectar con el servidor...  {error}</h1>
            <img className="patricio"  src={estrellaa} alt="Img Employe"></img>

        </div>
        }
        return(
            <>
            <div className="CardDetail">
                <h1>Name:{prize.name}</h1>
                <img className="imgProfile"  src={""+prize.imgSrc} alt="Img Prize"/>
                <p>Description: {""+prize.description}</p>
               
                <div className="ContainerPoints">
                <div className="Points"><h3 className="numberE"> {prize.points}</h3></div> 
                </div>
                

                <button className="btn-Delete" onClick={()=>this.deletePrize(prize.id)}>Delete</button>
                <button className="btn-Change" onClick={(e)=>this.mostrar(e)}>Change</button>
            </div>
                <form className="FormDetail ocultar " onSubmit={(e)=>this.changePrize(e,prize.id)}>
                
                    <label className="LabelForm">Name:</label>
                    <input className="InputForm" defaultValue={prize.name}/>
                    <label className="LabelForm">Url-img:</label>
                    <input className="InputForm" defaultValue={prize.imgSrc}/>
                    <label className="LabelForm">Description:</label>
                    <input className="InputForm" defaultValue={prize.description}/>
                    <label className="LabelForm">Points:</label>
                    <input className="InputForm" type="number" defaultValue={prize.points}/>
                    <button id="btn-Change2" type="submit">Change</button>
                </form>
            </>
        )
    }
}
export default DetailsPrize;