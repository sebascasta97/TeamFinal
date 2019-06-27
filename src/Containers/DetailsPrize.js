import React,{ Component} from 'react';
import {BASE_LOCAL_ENDPOINT} from '../constants';
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';


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
                "imgUrl": datos[3].value,
                "description": datos[5].value,
                "points": datos[7].value
               
        }
        axios.put(`${BASE_LOCAL_ENDPOINT}/prizes/${id}`,changePrize)
    }

    deletePrize=(id)=>
    {
        axios.delete(`${BASE_LOCAL_ENDPOINT}/prizes/${id}`);
        
       
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
            return <div  className="containError">No se pudo conectar con el servidor: {error}</div>
        }
        return(
            <>
                <h1>name:{prize.name}</h1>
                <img src={""+prize.imgSrc}/>
                <p>Description: {""+prize.description}</p>
                <h5>points: {""+prize.points}</h5>

                <button onClick={()=>this.deletePrize(prize.id)}>Delete</button>
                <form onSubmit={(e)=>this.changePrize(e,prize.id)}>
                    <label>Name:</label>
                    <input defaultValue={prize.name}/>
                    <label>Url-img:</label>
                    <input defaultValue={prize.imgUrl}/>
                    <label>Description:</label>
                    <input defaultValue={prize.description}/>
                    <label>Points:</label>
                    <input type="number" defaultValue={prize.points}/>
                    <button type="submit">Change</button>
                </form>
            </>
        )
    }
}
export default DetailsPrize;