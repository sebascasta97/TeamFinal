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
            },
            filterPrize:""

        }
   }

   componentDidMount = () => 
   {
        this.getprizes();
   }

   searchPrizes=(e)=>
   {
       const filtertext=e.target.value;
       console.log(filtertext);
       this.setState({ "[filterPrize]": filtertext })
    
   }
   PostPrize= (e)=>
   {
       e.preventDefault();
       console.log("el valor es");
       console.log(e.target.children);
      const datos=
      {
        "name": e.target.children[0].value,
		"description":  e.target.children[1].value,
		"points":  e.target.children[2].value,
		"imgUrl":  e.target.children[3].value
      }
       
       axios.post(`${BASE_LOCAL_ENDPOINT}/prizes`,datos);
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
        prizes: { content, error},
        filterPrize
    } = this.state;
    const filteredPrizes = content.filter(prize =>{
        if(prize.name.includes(filterPrize)===true)
        {
            console.log("si cumple")
            return prize;
        }});
        
    console.log(filteredPrizes);

    if (error!=="") {
        return <div>No se pudo conectar con el servidor, por favor intentelo nuevamente: {error}</div>
    }

    return (
                <>
                <form  onSubmit={(e)=>this.PostPrize(e)}>
                        <input type="text"  placeholder="name"/>
                        <input type="text" placeholder="Descripcion"/>
                        <input type="number" placeholder="points"/>
                        <input type="text"  placeholder="url-img"/>
                        <button  type="submit">Add</button>
                        
                </form>  
                <input name="txtSearchPrize" placeholder="Search a Prize" onChange={(e) => this.searchPrizes(e)}/>
                    {filteredPrizes.map(({ id, imgSrc, name,points}) => (
                        <Link key={id} to={`/prizes/${id}`}>

                        <Prize  key={id} imgSrc={imgSrc} name={name} points={points}/>
                        </Link>
                    ))}
                </>
            );
    }
}

export default ListPrizes;