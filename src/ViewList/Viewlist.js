import {React, useEffect,useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import './view.css'
import axios from 'axios'

const Viewlist = () => {
    const [Hotel , SetHotel] = useState([]);
    
 const[filter, setFilter] = useState([]); 
    const[query, setquery] = useState(''); 


    useEffect(()=>{
            loadHotel(); 
    },
    []
    )

   const loadHotel = async()=>{
        const result = await axios.get('http://localhost:4000/newuser');
        SetHotel(result.data);
        setFilter(result.data); 
    }


    // delelet user 
    const deleteuser = async(id)=>{
        
        const result = await axios.delete('http://localhost:4000/newuser/'+id)
        .then((result)=>{
            loadHotel(); 
            alert("successfully delete")
        }).catch(()=>{
            alert("Deleted unsuccesfull")
        })
    }

    const handlesearch =(event)=>{

        const getsearch = event.target.value ; 
        
   

        if(getsearch.length > 0){
           
            const searchdata= Hotel.filter((item)=>item.title.toLowerCase().includes(getsearch));
            SetHotel(searchdata)
        }
        else{
            SetHotel(filter);
        }
        setquery(getsearch);
    }
  return (
   <>
   

        <div className="row">

            <div className="col-md-12 text-center"><h2 style={{color:"violet"}}>All Registered Events</h2 ></div>

                <div className="search_data mx-5 ">
                    <input type="text" name='search' value={query} onChange={(e)=>handlesearch(e)}  placeholder='search data...' />
                </div>
        </div>
    <div className="container_forms">

        <table className='table'>
            <thead>
            <th>Index</th>
                <th>ID</th>
                <th>Event Name</th>
                <th>location</th>
                <th>Entry fee</th>
                <th>Requirement</th>
                <th>EDIT</th>
                <th>Delete</th>
            </thead>

            <tbody>
                {Hotel.map((Hotel,index)=>(
                <tr>
                    <td>{index+1}</td>
                <td>{Hotel._id}</td>
                <td>{Hotel.eventname}</td>
                <td>{Hotel.location}</td>
                <td>{Hotel.price}</td>
                <td>{Hotel.requirements?.split(',').map((e,i)=>(
                    <div>{Hotel?.requirements?.split(',')[i]}</div>
                ))} </td>
                <td className='btn'><Link to={`edit-hotel/${Hotel._id}`}>EDIT</Link></td>
               <td className='btn'><Link to='' onClick={()=>deleteuser(Hotel._id)}>Delete </Link></td>
                </tr>
                ))
             }   
            </tbody>
        </table>

    </div>



   </>
  )
}

export default Viewlist