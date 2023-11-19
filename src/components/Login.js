
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FormGroup, Label, Input, Form, Button } from "reactstrap"
import { loginUser } from '../service/API';
const Login = () => {
const navigate=useNavigate()
    const [userDetails,setUserDetails]=useState({
        username:"",
        password:"",
    })
    const validationForm=()=>{
        if(userDetails.username.length<=3){
            alert("username should be more than three characters")
            return false
        }
        else if(userDetails.password.length<=3){
                    alert("password should be more than three characters")
                    return false
                }

                return true    
    }
    const submitted = async(e) => {
        e.preventDefault()
      const isvalidation= validationForm()
if(isvalidation){
    try {
        const response=await loginUser(userDetails.username,userDetails.password)
        if(response.data.result&&response.data.token){
       
localStorage.setItem("token",response.data.token);

       alert(response.data.message)
       navigate("/home")
     
}else{
    alert(response.data.message)
}
    } catch (error) {
        console.log(error)
    }

}
        

    }
  return (
    <div>
    <Form className='form-wrapper'>
        <div className='background-wrapper'>
            <h3 className='title text-center'>Login</h3>
            <FormGroup floating>

                <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Email"
                    type="email"
                    onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})}
                 value={userDetails.username}
                />
                <Label for="exampleEmail" >
                username
                </Label>

            </FormGroup>
            {' '}
            <FormGroup floating>
                <Input
                    id="examplePassword"
                    name="password"
                    placeholder="Password"
                    type="password"

                    onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}
                    value={userDetails.password}
                />
                <Label for="examplePassword">
                    Password
                </Label>
            </FormGroup>

            {' '}
           <div className='d-flex justify-content-between'>
            <Button className='btn btn-ouline' type="submit" onClick={submitted}>
                Submit
            </Button>
            <Link to={"/"}>
                <Button className="btn btn-outline " >
             new User?
            </Button>
            </Link>
            </div>
        </div>
    </Form>
</div>
  )
}

export default Login