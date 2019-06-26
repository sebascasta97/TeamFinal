import React,{ Component} from 'react';
import { BASE_LOCAL_ENDPOINT } from '../constants';
import Achievement from '../components/Achievements';
import axios from 'axios';
//import {Link} from 'react-router-dom';

class ListAchievement extends Component
{
   constructor(props)
   {
        super(props);
        this.state=
        {
            achievements: {
                content: [],
                error: false
            }
        }
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

   render() { 
    const {
        achievements: { content, error }
    } = this.state;

    if (error!=="") {
        
        return <div>No se pudo conectar con el servidor: {error}</div>
    }

    return (
                <>  
                {console.log(error)}
                <input name="SearchAchievement" placeholder="Search Achievement"/>
                    {content.map(({ id,name,points }) => (
                        <Achievement  key={id}  name={name} points={points}/>                     
                    ))}
                </>
            );
    }
}

export default ListAchievement;