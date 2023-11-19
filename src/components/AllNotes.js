
import React, { useEffect, useState } from 'react'

import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export const AllNotes = ({titles,deleteNote,createNote,showTheContent,setShowEditForm}) => {
  
const navigate=useNavigate()
    const [searchContent,setSearchContent]=useState("")
    const [allTitles,setAllTitles]=useState([])

useEffect(()=>{
    const sortedNotes = titles.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
const localTimestinig=sortedNotes.map((val)=>{
    const {createdAt}=val
    const formattedDate = new Date(createdAt).toLocaleString();
  
  return{...val,createdAt:formattedDate}

})
    setAllTitles(localTimestinig)

},[titles])

const filteredNotes=(value)=>{
    setSearchContent(value)
    const newTitle=[...titles]
  
   const filterdVal=newTitle.filter((val)=>val.title.startsWith(value))
   const sortedNotes = filterdVal.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
   const localTimestinig=sortedNotes.map((val)=>{
       const {createdAt}=val
       const formattedDate = new Date(createdAt).toLocaleString();
     
     return{...val,createdAt:formattedDate}
   
   })
   setAllTitles(localTimestinig)

}
useEffect(()=>{
const data=localStorage.getItem("token")
if(!data){
navigate("/login")
}
},[])
  return (

   <div className='all-notes-container'>
     <div className=' search-wrapper'>
        <div className='inputAndSearch'>
            <input className='form-control search-box-wrap' value={searchContent}  onChange={(e)=>filteredNotes(e.target.value)}placeholder='search'/>
            <span className='cursor-pointer' onClick={()=>filteredNotes(searchContent)}><IoSearchSharp/></span>
            </div>
            <button  className='add-button' onClick={()=>createNote()}><IoMdAdd size={20}/></button >

        </div>
        <div>
            <h4 className='text-center'>Titles</h4>
        </div>
        <div className='allnotes row background-color-container'>
          {allTitles.length>0?allTitles.map((note,i)=>(
            <div  className="singleNote text-white"key={i}>

                <div className='col-sm-4 ps-3 me-3'>{note.createdAt}</div>
               
                <div className='col-sm-3 cursor-pointer' onClick={()=>showTheContent(note)}>{note.title.substring(0,11)}..</div>
                <button  className="pointer-on-click delete-button col-sm-2"  onClick={()=>deleteNote(note)}><MdDelete  /></button >
                <button className='edit-button col-sm-2' onClick={()=>setShowEditForm(note)} ><MdModeEditOutline size={15}/></button >
                <hr className='text-white hr '/>
            </div>
          )):
          <div className='text-white text-center mt-2'>There is no title</div>
            }
          
        </div>
        </div>
  )
}
