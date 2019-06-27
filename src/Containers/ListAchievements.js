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
            },
            filterAchievement:""
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

   searchAchievement=(e)=>
   {
       const filtertext=e.target.value;
       console.log(filtertext);
       this.setState({ "filterAchievement": filtertext })
    
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
        .then(
            setTimeout(200,window.location.reload())
            )
    }

    deleteAchievement=(id)=>
    {
        axios.delete(`${BASE_LOCAL_ENDPOINT}/achievements/${id}`)
        .then(()=>window.location.reload())
       
    }
   render() { 
    const {
        achievements: { content, error },
        filterAchievement
    } = this.state;
    const filterAchievements =content.filter(Achievement => Achievement.name.includes(filterAchievement));

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
                <input name="SearchAchievement" placeholder="Search Achievement" onChange={(e) => this.searchAchievement(e)}/>
                    {filterAchievements.map(({ id,name,points }) => (
                        <div key={id}>   
                            <Achievement name={name} points={points}/>  
                            <button onClick={()=>this.deleteAchievement(id)}>Delete</button>
                            <button>Change</button>
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