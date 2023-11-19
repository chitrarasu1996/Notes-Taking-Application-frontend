
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormGroup, Label, Input, Form, Button } from "reactstrap"
import { IoMdClose } from "react-icons/io";
import { updatheContent } from '../service/API';
const Editnote = ({showTheContent,showEditForm,setShowEditForm,getAllNotes,editeContent,setEditContent}) => {

    const submitted=async(e)=>{

        try {
            e.preventDefault()
            const res=await updatheContent(editeContent.title,editeContent.content,editeContent._id)
            if(res.data.result){
            alert(res.data.message)
            setShowEditForm(!showEditForm)
            showTheContent("")
            getAllNotes()
        }else{
            alert(res.data.message)
        }
        
           
        } catch (error) {
            console.log(error)
        }
        }
  return (
    <div>

<Form className='form-wrapper'>
        <div className='background-wrapper'>
            
            <h3 className='title text-center text-white'>Edit Note
            <span  className={`cursor-pointer ps-2 hovertheCloseBtn`}
             onClick={()=>setShowEditForm(!showEditForm)}>
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
         
            value={editeContent.title}
            onChange={(e)=>setEditContent({...editeContent,title:e.target.value})}
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
      style={{maxHeight:"200px"}}
      value={editeContent.content}
            onChange={(e)=>setEditContent({...editeContent,content:e.target.value})}
/>
<Label for="exampleEmail" >
write Your Content here
</Label>

</FormGroup>
{' '}
           <div className='d-flex justify-content-center'>
            <Button className='btn btn-primary text-white submit-button' type="submit" onClick={submitted}>
                Submit
            </Button>
            <Link to={"/home"}>
             
            </Link>
            </div>
        </div>
    </Form>
    </div>
  )
}

export default Editnote