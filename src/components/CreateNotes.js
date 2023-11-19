import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormGroup, Label, Input, Form, Button } from "reactstrap"
import { IoMdClose } from "react-icons/io";
import { createNotes } from '../service/API';
const CreateNotes = ({setShowCreateTableForm,showCreateTableForm,getAllNotes}) => {
const [notesDetails,setNotesDetails]=useState({
    title:"",
    content:""
})

const navigate=useNavigate()
const submitted=async(e)=>{

try {
    e.preventDefault()
    const token=localStorage.getItem("token")
    
if(token){
    const res=await createNotes(notesDetails.title,notesDetails.content,token)

    if(res.data.result){
    alert(res.data.message)
    setShowCreateTableForm(!showCreateTableForm)
    getAllNotes()
}else{
    alert(res.data.message)
}
}
   
} catch (error) {
    console.log(error)
}
}
const [hover,setHover]=useState("close")
  return (
    <div>
          <div>
    <Form className='form-wrapper'>
        <div className='background-wrapper'>
            
            <h3 className='title text-center text-white'>Create Note
            <span  className={`cursor-pointer ps-2 hovertheCloseBtn`}
             onClick={()=>setShowCreateTableForm(!showCreateTableForm)}>
                <IoMdClose/>
            </span>
            </h3>
            {' '}
            <FormGroup floating>

                <Input
                    id="title"
                    name="title"
                    placeholder="title"
                    type="text"
            style={{color:"black"}}
            value={notesDetails.title}
            onChange={(e)=>setNotesDetails({...notesDetails,title:e.target.value})}
                />
                <Label for="exampleEmail" >
                write your Title here
                </Label>

            </FormGroup>
            {' '}
            <FormGroup floating>

<Input
      type="textarea" // Use type="textarea" for multiline text input
      name="content"
      id="exampleEmail"
      placeholder="Enter your content here"
      style={{color:"black",maxHeight:"200px"}}
      value={notesDetails.content}
            onChange={(e)=>setNotesDetails({...notesDetails,content:e.target.value})}
/>
<Label for="exampleEmail" >
write Your Content here
</Label>

</FormGroup>
{' '}
           <div className='d-flex justify-content-center'>
            <Button className='btn text-white submit-button' type="submit" onClick={submitted}>
                Submit
            </Button>
            <Link to={"/home"}>
             
            </Link>
            </div>
        </div>
    </Form>
</div>
    </div>
  )
}

export default CreateNotes