import React,{ Component} from 'react';
import axios from 'axios';
import { BASE_LOCAL_ENDPOINT } from '../constants';
import Prize from '../components/Prize';
import {Link} from 'react-router-dom';

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
        //const  id  = toString(this.props.match.params);
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
            console.log(arrayPrizes.filter(prize => points >=prize.points));
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
    

    changeEmploye=(e,id)=>
    {
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
    }

    deleteEmploye=(id)=>
    {
        axios.delete(`${BASE_LOCAL_ENDPOINT}/employees/${id}`);
        
       
    }
render()
    {
        const {prizes,employe,error} = this.state;
        
    
        if (error!=="" || prizes.error!=="") {
            return <div>No se pudo conectar con el servidor: {error}</div>
        }
        return(
            <>
                
                
                 <h1>{employe.name}</h1>
                 <h5>Hired in: xxxxx</h5>
                 <img src={employe.imgSrc} alt="Img Employee" />
                 <h5>Job: {employe.job}</h5>
                 <h5>Work Area: {employe.area}</h5>
                 <h5>Estrellas:{employe.points}</h5>
                 
                 
                 <button onClick={()=>this.deleteEmploye(employe.id)}>Delete</button>
                <form onSubmit={(e)=>this.changeEmploye(e,employe.id)}>
                    <label>Name:</label>
                    <input defaultValue={employe.name}/>
                    <label>Job:</label>
                    <input defaultValue={employe.job}/>
                    <label>Work Area:</label>
                    <input defaultValue={employe.area}/>
                    <label>Points:</label>
                    <input type="number" defaultValue={employe.points}/>
                    <label>Url-img:</label>
                    <input defaultValue={employe.imgSrc}/>
                    
                    <button type="submit">Change</button>
                </form>
                <h1>Prizes</h1>
                {
                    prizes.content.map(({ id, imgSrc, name,points}) => (
                        <Link key={id} to={`/prizes/${id}`}>

                        <Prize  key={id} imgSrc={imgSrc} name={name} points={points}/>
                        </Link>
                    ))
               
                }
            </>

        )

        
            
    }
}

export default DetailEmploye;