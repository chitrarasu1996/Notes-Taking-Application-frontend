import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FormGroup, Label, Input, Form, Button } from "reactstrap"
import { registerUser } from '../service/API';


const Register = () => {
    const navigate=useNavigate()
const [userDetails,setUserDetails]=useState({
    username:"",
    password:"",
    confirmPassword:""
})
useEffect(()=>{
const token=localStorage.getItem("token")
if(token){
    navigate("/home")
}
},[])

const validationForm=()=>{
    if(userDetails.username.length<=3){
        alert("username should be more than three characters")
        return false
    }
            if(userDetails.confirmPassword!==userDetails.password){
    alert("password and confirm password should be same")
    return false
            }else if(userDetails.confirmPassword.length<=3||userDetails.password.length<=3){
    
                alert("password and confirm password should be more than three characters")
                return false
            }
            return true
    
}
    const submitted = async(e) => {
        e.preventDefault()
      const isvalidation= validationForm()
      
if(isvalidation){
    try {
        const response=await registerUser(userDetails.username,userDetails.password)

        if(response.data.result){

alert(response.data.message)
navigate("/login")
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
                    <h3 className='title text-center'>Register user</h3>
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
                    {' '}
                    <FormGroup floating>
                        <Input
                            id="examplePassword1"
                            name="password1"
                            placeholder="Confirm Password"
                            type="password"
                            onChange={(e)=>setUserDetails({...userDetails,confirmPassword:e.target.value})}
                            value={userDetails.confirmPassword}
                        />
                        <Label for="examplePassword1">
                           Confirm Password
                        </Label>
                    </FormGroup>

                    {' '}
                    <Button className='btn btn-dark' type="submit" onClick={submitted}>
                        Submit
                    </Button>
                    <Link to={"/login"}><Button className="btn btn-outline ms-2" >
                        Already have an account
                    </Button>
                    </Link>

                </div>
            </Form>
        </div>
    )
}

export default Register;