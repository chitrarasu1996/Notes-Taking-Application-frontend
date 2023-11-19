import React, { useEffect, useState } from 'react'
import Search from './Search'
import { AllNotes } from './AllNotes'
import Content from './Content'
import { deletetheNoteById, getAllNotesById } from '../service/API'
import CreateNotes from './CreateNotes'
import Editnote from './Editnote'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [userToken,setUserToken]=useState("")
  const [allnotes,setAllNotes]=useState([])
const [perticularContent,setPerticularContent]=useState("")
  const [showCreateTableForm,setShowCreateTableForm]=useState(false)
  const [showTheEditForm,setShowTheEditForm]=useState(false)
  const [editeContent,setEditContent]=useState({})
const[perticularDeletedId,setPerticularDeletedId]=useState("")
useEffect(()=>{
  const token=localStorage.getItem("token")
setUserToken(token)
},[])

useEffect(()=>{
  if(userToken){
      getAllNotes()
  }
},[userToken])

const getAllNotes=async()=>{
  try {
      const response=await getAllNotesById(userToken)
    
      if(response.data.result){
setAllNotes(response.data.notes)
      }
  } catch (error) {
      
  }

}

//----------------showcontent
const  showTheContent=(content)=>{
setPerticularContent(content)

}
////show edit from
const setShowEditForm=(note)=>{

setShowTheEditForm(!showTheEditForm)
setEditContent(note)

}

// ------------createnote-----------------

const createNote=()=>{

setShowCreateTableForm(!showCreateTableForm)

}
  // ------------createnote-----------------

const deleteNote=async(note)=>{
try {
  const response=await deletetheNoteById(note._id)
  if(response.data.result){
    getAllNotes()
    setPerticularDeletedId(note._id)
    
  }
} catch (error) {
  console.log(error)
}
}

  return (
   <div className='home-container'>
    
      <div className='hole-container'>
      
        <div className='row'>
          <div className='col-md-4 '>
            <AllNotes  token ={userToken}setShowEditForm={setShowEditForm} showTheContent={showTheContent} titles={allnotes} deleteNote={deleteNote}  createNote={createNote}  />
          </div>
          <div className='col-md-8'>
          <Content userToken={userToken} perticularDeletedId={perticularDeletedId} perticularContent={perticularContent}/>
          </div>
        </div>
    
        {showCreateTableForm && (
          <div className='create-notes-absolute'>
            <CreateNotes getAllNotes={getAllNotes} showCreateTableForm={showCreateTableForm} setShowCreateTableForm={setShowCreateTableForm}/>
          </div>
        )}
        {showTheEditForm&&(
          <div className='create-notes-absolute'>
            <Editnote  showTheContent={showTheContent}  perticularContent={perticularContent}getAllNotes={getAllNotes} setEditContent={setEditContent} editeContent={editeContent} showTheEditForm={showTheEditForm} setShowEditForm={setShowEditForm}/>
          </div>
        )}
        </div>
      </div>
 
  )
}

export default Home