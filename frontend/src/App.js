
import './App.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function App() {    
  let array=[] 
  
  const [id, setId] = useState("")
  const [size, setsize] = useState(0)
  const [isUpdate, setisUpdate] = useState(false)
  const [data, setdata] = useState([]);  
  const [mode, setmode] = useState(false) 
  const [isSubmit, setisSubmit] = useState(true) 
  const [checkArray , setcheckArray]= useState([]);
 const [formData, setFormData] =useState({
   id:"",
   name:"",
   phone:"",
   email:"",
   hobbies:"",
 })   
 function handleChange(e,data){

if(e.target.checked)
{
   array.push(data); 
   setcheckArray([...checkArray,data])
  
 
}
if(!e.target.checked)
{
  
    
    setcheckArray([...checkArray.filter(function(item) {
      return item !== data})])


}



 }
  function cancelAdd(){
    setFormData({ 
    name:"",
    phone:"",
    email:"",
    hobbies:""}) 
    setisUpdate(false);
setmode(false)
 }
 const deleteData= async(id)=>{ 
  
   try {
     const message =await axios.delete('/api/data/delete/' + id);
      if(message.data.message==="Success"){ 
        
      console.log(message.data.message)
      fetch();}
   } catch (error) { 

     alert("Failed")
     console.log(error)
   }
 }
 const updateData= (Id,name,email,phone,hobbies)=>{
     
    setmode(true) ; 
    setisUpdate(true)
    setFormData({ 
    name:name,
    phone:phone,
    email:email,
    hobbies:hobbies}) 
    setId(Id) 
  

}
 const handleFormChange = (e) =>{
  const {name,value} =e.target;
   
  setFormData({...formData,[name]:value})
 }
 console.log(formData)
async function handleSubmit(e){ 
  e.preventDefault();
     try { 
    console.log(id)
     const data =  isUpdate ? await
     axios.patch("/api/data/update/"+ id,{
     
      name:formData.name,
      email: formData.email,
      phone:formData.phone,
      hobbies:formData.hobbies 

    })   
     
     :await axios.post("/api/data/create",{
      
       name:formData.name,
       email: formData.email,
       phone:formData.phone,
       hobbies:formData.hobbies 

     }) 
     console.log(data.data.message); 
     if(data&& data.data.message==="Success"){
       
      setisUpdate(false);
       setmode(false)
       fetch();
       setFormData({ id:"",
       name:"",
       phone:"",
       email:"",
       hobbies:""})
     } 
     } catch (error) {
       console.log(error)
     }
}
async function handleAdd(){ 
 setisUpdate(false)
setmode(true)
}

const fetch= async()=>{
  try {
    const fetchedData = await axios.get("/api/data/");  
if(fetchedData) {
  setdata(fetchedData.data.data) 
  setsize (fetchedData.data.data.length+1);
}



  } catch (error) {
    console.log(error);
  }



} 
async function handleS(){
console.log(checkArray)  
setisSubmit(false);
if(checkArray.length==0){
  alert("No data selected") 
  setisSubmit(true)
}

else {
try {
  const data = await axios.post('/api/data/mail/send',{
    dataArr : checkArray
  }) 
  if(data&&data.data.message==="Success"){
    setisSubmit(true)
  alert( "sent"); 
 
  } 
  else {
      setisSubmit(true)
    alert("Failed")
  
  }
} catch (error) {
  setisSubmit(true)
  console.log(error)
} 
}

}
  useEffect( () => { 
    fetch();
    
  }, [])
  
  return ( 

<> 
{mode ? <>




<form   onSubmit={
  handleSubmit
}>
   
  <div className="mb-3">
  <label htmlFor="exampleFormControlInput2" className="form-label">Name</label>
  <input type="text"  onChange={handleFormChange} value={formData.name} className="form-control"  name="name" id="exampleFormControlInput2" ></input>
</div>
  <div className="mb-3">
  <label htmlFor="exampleFormControlInput3"  className="form-label">Phone</label>
  <input type="text"  name="phone" onChange={handleFormChange} value={formData.phone} className="form-control" id="exampleFormControlInput3" ></input>
</div>
  <div className="mb-3">
  <label htmlFor="exampleFormControlInput4" className="form-label">Email address</label>
  <input type="email"  name="email"   onChange={handleFormChange} value={formData.email} className="form-control" id="exampleFormControlInput4" placeholder="name@example.com"></input>
</div>

<div className="mb-3">
  <label htmlFor="exampleFormControlTextarea1" className="form-label">Hobbies</label>
  <textarea className="form-control"  name="hobbies"  onChange={handleFormChange} value={formData.hobbies} id="exampleFormControlTextarea1" rows="3" placeholder='Hobbies'></textarea>
</div>

<button type="submit" className="btn btn-primary">{isUpdate?"Update" :"Add Data"} </button>
<button type="button"  onClick={cancelAdd} className="btn btn-warning">Cancel</button> 

</form>
</> :<><table className="table">
  <thead className="table-dark"> 
  <tr> 
  <th>Select</th>
    <th>S.No</th>
    <th>Name</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Hobbies</th>
    <th>Update</th>
    <th>Delete</th>
    </tr>
  </thead>
  <tbody>  
{
  data.map((value,index)=>(
    <tr key={index}>
    <td><input onChange={(e)=>handleChange(e,value)} type="checkbox"></input></td>
  <td>{index+1}</td>
  <td>{value.name}</td>
  <td>{value.email}</td>
  <td>{value.phone}</td>
  <td>{value.hobbies}</td>
<td> <button type="button" style={{"margin":"10px"}} onClick={()=>updateData(value._id,value.name,value.email,value.phone,value.hobbies)} className="btn btn-success">Update</button></td>
  <td> <button type="button" style={{"margin":"10px"}} onClick={()=>deleteData(value._id)} className="btn btn-danger">Delete</button></td>
  </tr> 
  ))
}

  
  </tbody>
</table>
<button type="button" style={{"margin":"10px"}} onClick={handleAdd} className="btn btn-primary">Add Data</button> 

<button type="button" style={{"margin":"10px"}} onClick={handleS} className="btn btn-primary">
  {isSubmit?"Send Mail": <div className="spinner-border"  role="status">
  <span className="visually-hidden">Loading...</span>
</div>}
</button> 
 </>}







</>
  // <Button style={{"bottom":"10px","right":"10px" , "display":"absolute"}}>Add </Button>
  // </>
  );
}

export default App;
