import React,{ Component} from 'react';
import {BASE_LOCAL_ENDPOINT} from '../constants';
import Axios from 'axios';

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
        Axios.get(`${BASE_LOCAL_ENDPOINT}/prizes/${id}`)
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

    render()
    {
        const{
            prize,
            error
        }=this.state;
        if(error!=="")
        {
            return <div className="containError">No se pudo conectar con el servidor: {error}</div>
        }
        return(
            <>
                <h1>name:{prize.name}</h1>
                <img src={prize.imgSrc}/>
                <p>Description: {prize.description}</p>
                <h5>points: {prize.points}</h5>
            </>
        )
    }
}
export default DetailsPrize;