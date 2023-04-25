import {React, useState} from 'react'
import axios from 'axios'
import './form.css'


const Form = () => {
  const [files,setFiles]=useState("");
  const [Hotel , SetHotel] = useState(({
    'eventname':'',
    'location':'',
    'requirements':'',
    'price':'',
    'gender':'',
    'details':'',
    'cover_img':'',
   
}));
 
const [message, setmessage] = useState(''); 

const{eventname,location,requirements,price,gender,details} = Hotel ;

const handlChange = (e)=>{
  SetHotel({...Hotel , [e.target.name]:e.target.value})
}

const submitForm=async(e)=>{
  e.preventDefault(); 

  try {
    const list=await Promise.all(Object.values(files).map(async file=>{
      const formData =new FormData();
      formData.append("file",file)
formData.append("upload_preset","upload");
const uploadRes= await axios.post("https://api.cloudinary.com/v1_1/dsvbnl3dq/image/upload",formData)
const {url}=uploadRes.data;
return url;
    }))

    const newData={
      eventname,
      location,
      requirements,
      price,
      gender,
      details,
      cover_img:list[0],
      
    }
    console.log(newData);
    await axios.post('http://localhost:4000/newuser/add',newData)
    .then((result)=>{
      setmessage('successfully added')
      console.log(result);
    }).catch((err)=>{
    
      alert(err);
    })
  } catch (error) {
    console.log(error)
  }

}

//console.log(Hotel);
  return (
    <div>   
        
        <div className="form">
      <h3>Add new Event here.....</h3>

      <div className="message_visible text-center col-md-12"><h2>{message}</h2></div>
        <div className="form_container">
        <form onSubmit={e=>{submitForm(e)}}>
  <div class="form-group">
    <label for="hotel1">Event Name</label>
    <input class="form-control" id="hotel1" aria-describedby="emailHelp" name="eventname" value={eventname}
   onChange={e=>handlChange(e)}  placeholder="Enter Hotel name"/>
  </div>
  <div class="form-group">
    <label for="Address">Location</label>
    <input  class="form-control" id="Address" name='location' value={location} onChange={e=>handlChange(e)} placeholder="Enter hotel address"/>
  </div>
  <div class="form-group">
    <label for="Amenities">Requirement</label>
    <input  class="form-control" id="requirements" name='requirements' value={requirements} onChange={e=>handlChange(e)} placeholder="Enter Amentities"/>
  </div>
  <div class="form-group">
    <label for="Budget">Entry fee</label>
    <input type='number' class="form-control" id="Budget" name='price' value={price} onChange={e=>handlChange(e)} placeholder="Enter Budget in numeric"/>
  </div>
  <div class="form-group">
    <label for="Gender">Gender </label>
    <input  class="form-control" id="gender" name='gender' value={gender} onChange={e=>handlChange(e)} placeholder="specify gender"/>
  </div>
  <div class="form-group">
    <label for="Details">Details</label>
    <input  class="form-control" id="details" name='details' value={details} onChange={e=>handlChange(e)} placeholder="Enter Amentities"/>
  </div>
  <div class="form-group">
    <label for="image">image upload</label>
    <input class="form-control" type="file" id="myFile" name="filename" multiple="multiple"  onChange={(e)=>
      setFiles(e.target.files)
    //SetHotel({...Hotel,cover_img:e.target.files[0]})
    }/>
  </div>
  <div className="button" style={{marginTop:'1rem'}}>
  <button type="submit" class="btn btn-primary">Add</button>
  </div>
  
</form>
        </div>
        </div>
    </div>
  )
}

export default Form