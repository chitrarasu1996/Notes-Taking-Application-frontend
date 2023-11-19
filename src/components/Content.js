import React, { useEffect, useState } from 'react'
import note from "../img/note.png"
import { FaUserAlt } from "react-icons/fa";
import { getUserNameById } from '../service/API';
import { Link, useNavigate } from 'react-router-dom';
const Content = ({ perticularDeletedId,perticularContent,userToken,allnotes }) => {
if(perticularDeletedId===perticularContent._id){
    perticularContent.content=""
}
    const [userName,setUserName]=useState("")
             const navigate=useNavigate()
useEffect(()=>{
if(userToken){
    getUserName()
}
},[userToken])
const getUserName=async()=>{
    try {
        const response=await getUserNameById(userToken)
     if(response.data.result){
setUserName(response.data.user.username)
     }
    } catch (error) {
        console.log(error)
    }
}

const logout=()=>{
   
    const removedToken=localStorage.removeItem("token")
        navigate("/login")
      
}
    return (
        <>
        
        <div className='hole-content-container'>
        <div className='dropdown-wrapper'>
        <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <FaUserAlt/>
  </button>
  <ul className="dropdown-menu">
    <li><button className="dropdown-item" type="button">{userName&&userName}</button></li>
    <li><button className="dropdown-item" type="button" onClick={logout}>logout</button></li>
    
  </ul>
</div>
        </div>
            {!perticularContent.content ?
                <div className='text-center welcomenote' >
                    <h2 className='mt-4'>welcome to Note</h2>
                    <div className='img-wrapper'>
                        <img src={note} style={{ width: "300px", paddingRight: "100px" }} />
                    </div>
                </div> :
                <div className='single-content'>
                     <div><h3>Content</h3></div>
                    <div className='perticular-content text-white'>
                    {perticularContent.content}
                    </div>
                   
                </div>
            }

        </div>
       
        </>
    )
}

export default Content