import {React, useState,useEffect} from 'react'
import axios from 'axios'
import {useNavigate,useParams} from 'react-router-dom'
import  './edit.css'
const Edit = () => {
    const history = useNavigate(); 
const {id} = useParams();
    const [Hotel , SetHotel] = useState(({
        'eventname':'',
        'location':'',
        'requiremnets':'',
        'price':'',
        'gender':'',
        'details':'',
        'cover_img':null,
       
    }));
    const [message, setmessage] = useState(''); 
    
    const{eventname,location,requiremnets,price,gender,details} = Hotel ;


const submitForm=async(e)=>{
    e.preventDefault(); 
    const formData =new FormData();

    formData.append('title',Hotel.eventname);
    formData.append('location',Hotel.location);
    formData.append('Amenities',Hotel.Amenities);
    formData.append('price',Hotel.price);
    formData.append('gender',Hotel.gender);
    formData.append('details',Hotel.details);
    formData.append('cover_img',Hotel.cover_img);
 await axios.put('http://localhost:4000/newuser/update/'+id,formData)
    .then((result)=>{
      setmessage('successfully added')
   history('/')
    }).catch((err)=>{
    
      alert('something went wrong');
    })
  }
  useEffect(()=>{
    loadHotel(); 
},
[]
)

const handlChange = (e)=>{
    SetHotel({...Hotel , [e.target.name]:e.target.value})
  }

const loadHotel = async()=>{
    const result = await axios.get('http://localhost:4000/newuser/'+id);
    SetHotel(result.data);
    
    
}

  return (
  <>
    <div className="form">
      <h3>EDIT.....</h3>
      <div className="message_visible text-center col-md-12"><h2>{message}</h2></div>
        <div className="form_container">
        <form onSubmit={e=>{submitForm(e)}}>
  <div class="form-group">
    <label for="hotel1">Hotel Name</label>
    <input class="form-control" id="hotel1" aria-describedby="emailHelp" name="title" value={eventname}
   onChange={e=>handlChange(e)}  placeholder="Enter Hotel name"/>
  </div>
  <div class="form-group">
    <label for="Address">Address</label>
    <input  class="form-control" id="location" name='location'  value={location}  onChange={e=>handlChange(e)}
    placeholder="Enter hotel address"/>
  </div>
  <div class="form-group">
    <label for="Amenities">Amenities</label>
    <input  class="form-control" id="amenities" name='Amenities' value={requiremnets} onChange={e=>handlChange(e)}
     placeholder="Enter Amentities"/>
  </div>
  <div class="form-group">
    <label for="price">Budget</label>
    <input type='number' class="form-control" id="price" name='price' value={price} onChange={e=>handlChange(e)}
    placeholder="Enter Budget in numeric"/>
  </div>
  <div class="form-group">
    <label for="Gender">Gender</label>
    <input  class="form-control" id="gender" name='gender' value={gender} onChange={e=>handlChange(e)}
     placeholder="Specify gender"/>
  </div>
  <div class="form-group">
    <label for="Details">Details</label>
    <input  class="form-control" id="details" name='details' value={details} onChange={e=>handlChange(e)}
     placeholder="Enter Details"/>
  </div>
  <div class="form-group">
    <label for="image">image upload</label>
    <input class="form-control" type="file" id="myFile" name="filename" onChange={(e)=>
    SetHotel({...Hotel,cover_img:e.target.files[0]})}/>
  </div>
  <div className="button" style={{marginTop:'1rem'}}>
  <button type="submit" class="btn btn-primary">Submit</button>
  </div>
  
</form>
        </div>
        </div>
  
  </>
  )
}
export default Edit