import React,{ Component} from 'react';
import axios from 'axios';
import { BASE_LOCAL_ENDPOINT } from '../constants';
import Prize from '../components/Prize';
import {Link} from 'react-router-dom';
import { Button } from 'reactstrap';
import estrellas from '../img/estrella.png';
import estrellaa from '../img/patric.png';

class DetailEmploye extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            employe:
            {
                id: "",
                name: "",
                job: "",
                area: "",
                imgSrc: "",
                points: ""
                
            },
            error:"",
            prizes: {
                content: [],
                error: ""
            },
            createprizesError: false
            
        }


    }
    
    componentDidMount=()=>
    {
        const { match: { params: { id } } } = this.props;
        axios.get(`${BASE_LOCAL_ENDPOINT}/employees/${id}`)
        .then(information => {
            this.setState({
                employe: information.data,
            })
            console.log("los puntos"+information.data.points);
            this.getPrizesEmployee(information.data.points);
        })
        .catch(error =>
        {
            this.setState(
                {
                    error: error.message
                }
            )
        })

        

    }
    getPrizesEmployee=(points)=>
    {
        axios.get(`${BASE_LOCAL_ENDPOINT}/prizes`)
        .then(information => {
            const arrayPrizes=information.data.sort(function(previous,next)
            {
                return previous.points-next.points;
            })
        
            console.log(arrayPrizes.filter(prize => prize.points<=9));
            this.setState({
                prizes: {
                    content: arrayPrizes.filter(prize => prize.points<=Number(points)),
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
    

    changeEmploye=(e,id)=>
    {
        e.preventDefault();
        const datos=e.target.children;
        console.log("name"+datos[1].value);
        console.log("job"+datos[3].value);
        console.log("area"+datos[5].value);
        console.log("points"+datos[7].value);
        console.log("imgurl"+datos[9].value);


        const changeEmploye=
        {
            

                "name": datos[1].value,
                "job": datos[3].value,
                "area":datos[5].value,
                "points": datos[7].value,
                "imgSrc": datos[9].value
        }
        axios.put(`${BASE_LOCAL_ENDPOINT}/employees/${id}`,changeEmploye)
        .then(()=>window.location.reload())
        
    }

    deleteEmploye=(id)=>
    {
        axios.delete(`${BASE_LOCAL_ENDPOINT}/employees/${id}`)
        .then(()=>this.props.history.push('/employees'))
        
       
    }
    mostrar()
    {
        
        document.getElementsByClassName("FormDetail")[0].className="FormDetail animated  fadeInDown  ";
    }
    
render()
    {
        const {prizes,employe,error} = this.state;
        
    
        if (error!=="" || prizes.error!=="") {
            return <div className="nNetwork">
            <h1>No se pudo conectar con el servidor...  {error}</h1>
            <img className="patricio"  src={estrellaa} alt="Img Employe"></img>

        </div>
        }
        return(
            <>
                
                <div className="CardDetail">
                 <h1>{employe.name}</h1>
                 <img className="imgProfile" src={employe.imgSrc} alt="Img Employee" />
                 <h5>Job: {employe.job}</h5>
                 <h5>Work Area: {employe.area}</h5>               
                 <div className="Points"><h3 className="numberE"> {employe.points}</h3></div>
                 <button className="btn-Delete" onClick={()=>this.deleteEmploye(employe.id)} >Delete</button>
                 <button className="btn-Change" onClick={(e)=>this.mostrar(e)}>Change</button>
                 </div>
                 
                 

                <form className="FormDetail ocultar" onSubmit={(e)=>this.changeEmploye(e,employe.id)}>
                    
                    <label className="LabelForm">Name:</label>
                    <input className="InputForm" defaultValue={employe.name}/>
                    <label className="LabelForm">Job:</label>
                    <input className="InputForm" defaultValue={employe.job}/>
                    <label className="LabelForm">Work Area:</label>
                    <input className="InputForm" defaultValue={employe.area}/>
                    <label className="LabelForm">Points:</label>
                    <input className="InputForm" type="number" defaultValue={employe.points}/>
                    <label className="LabelForm">Url-img:</label>
                    <input className="InputForm" defaultValue={employe.imgSrc}/>
                    <button className="btn-Change btn" type="submit">Change</button>
                </form>
                <div className="containerEmployees">
                <h1>Prizes</h1>
                {
                    prizes.content.map(({ id, imgSrc, name,points}) => (
                        <Link key={id} to={`/prizes/${id}`}>

                        <Prize  key={id} imgSrc={imgSrc} name={name} points={points}/>
                        </Link>
                    ))
               
                }
                </div>
            </>

        )

        
            
    }
}

export default DetailEmploye;