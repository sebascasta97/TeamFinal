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
    }

    deleteAchievement=(id)=>
    {
        axios.delete(`${BASE_LOCAL_ENDPOINT}/achievements/${id}`);
        
       
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
                <form  onSubmit={(e)=>this.PostAchievements(e)}>
                    <input placeholder="Name"></input>
                    <input placeholder="Points"></input>
                    <button type="submit">Create</button>
                </form>  
                {console.log(error)}
                <input name="SearchAchievement" placeholder="Search Achievement"/>
                    {content.map(({ id,name,points }) => (
                        <div>   
                            <Achievement  key={id}  name={name} points={points}/>  
                            <button onClick={()=>this.deleteAchievement(id)}>Delete</button>
                            <button>Modificar</button>
                            <form  onSubmit={(e)=>this.changeAchievement(e,id)}>
                                <label>Name:</label>
                                <input placeholder="Name" defaultValue={name}></input>
                                <label>Points:</label>
                                <input placeholder="Points" defaultValue={points}></input>
                                <button type="submit">Change</button>
                            </form>  
                            
                            
                        </div>
                                           
                    ))}
                </>
            );
    }
}

export default ListAchievement;