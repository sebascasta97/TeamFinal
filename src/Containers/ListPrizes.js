import React ,{ Component} from 'react';
import { BASE_LOCAL_ENDPOINT } from '../constants';
import Prize from '../components/Prize';
import axios from 'axios';
import {Link} from 'react-router-dom';

class ListPrizes extends Component
{
   constructor(props)
   {
        super(props);
        this.state=
        {
            prizes: {
                content: [],
                error: false
            }
        }
   }

   componentDidMount = () => 
   {
        this.getprizes();
   }


   getprizes= ()=>
   {
    axios.get(`${BASE_LOCAL_ENDPOINT}/prizes`)
    .then(information => {
        this.setState({
            prizes: {
                content: information.data,
                error: ''
            },
            createprizesError: false
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

   render() { 
    const {
        prizes: { content, error }
    } = this.state;

    if (error) {
        return <div>No se pudo conectar con el servidor, por favor intentelo nuevamente: {error}</div>
    }

    return (
                <>  
                <input name="txtSearchPrize" placeholder="Search a Prize"/>
                    {content.map(({ id, imgSrc, name,points,description }) => (
                        <Link key={id} to={`/prizes/${id}`}>

                        <Prize  key={id} imgSrc={imgSrc} name={name} points={points} description={description}/>
                        </Link>
                    ))}
                </>
            );
    }
}

export default ListPrizes;