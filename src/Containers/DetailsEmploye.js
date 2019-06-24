import React,{ Component} from 'react';
import axios from 'axios';
import { BASE_LOCAL_ENDPOINT } from '../constants';
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
            error:""
            
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
render()
    {
        const {
            employe,
            error
        } = this.state;
    
        if (error!=="") {
            return <div>No se pudo conectar con el servidor: {error}</div>
        }
        return(
            <>
                
                 <h1>{employe.name}</h1>
                 <h5>Hired in: xxxxx</h5>
                 <img src={employe.imgSrc} />
                 <h5>Job: {employe.job}</h5>
                 <h5>Work Area: {employe.area}</h5>
                 <h5>Estrellas:{employe.points}</h5>
                 
            </>

        )

        
            
    }
}

export default DetailEmploye;