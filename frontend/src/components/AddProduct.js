import React from 'react'
import { useNavigate } from 'react-router-dom';
const AddProduct=()=>{
const [name,setName]=React.useState('');
const [price,setPrice]=React.useState('');
const [category,setCategory]=React.useState('');
const [company,setCompany]=React.useState('');
const navigate=useNavigate();
const[error,setError]=React.useState(false)
const addproduct=async()=>{
    console.log(!name);
    if(!name||!price||!category||!company){
        setError(true)
        return false;
    }
    const userId=JSON.parse(localStorage.getItem('user'))._id;
    let result =await fetch("http://localhost:3476/add-product",{
        method:'post',
        body:JSON.stringify({name,price,category,company,userId}),
        headers:{
            "Content-Type":"application/json",
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });
    result=await result.json();
    console.log(result);
navigate('/');

}
    return(

        <div className='product'>
            <h1>ADD PRODUCT</h1>
            <input type="text" placeholder='Enter product name' className='inputBox'
            value={name} onChange ={(e)=>{setName(e.target.value)}}/>
           {error&&!name&& <span className='invalid-input'>Enter valid name</span>}
            <input type="text" placeholder='Enter product price' className='inputBox'
            value={price} onChange ={(e)=>{setPrice(e.target.value)}}/>
             {error&&!price&& <span className='invalid-input'>Enter valid name</span>}
            <input type="text" placeholder='Enter product category' className='inputBox'
            value={category} onChange ={(e)=>{setCategory(e.target.value)}}/>
             {error&&!category&& <span className='invalid-input'>Enter valid name</span>}
            <input type="text" placeholder='Enter company name' className='inputBox'
            value={company} onChange ={(e)=>{setCompany(e.target.value)}}/>
             {error&&!company&& <span className='invalid-input'>Enter valid name</span>}
            <button onClick={addproduct} className='appbutton'>Add Product</button>
        </div>
    )
}
export default AddProduct