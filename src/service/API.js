import axios from "axios"

const URL="https://notes-taking-application-backend-nivg.onrender.com/"

export const registerUser=async(username,password)=>{
 
    const response=await axios.post(URL+"user/register-user",{username,password})
   return response
}

export const loginUser=async(username,password)=>{
const response=await axios.post(URL+"user/login-user",{username,password})
return response
}

export  const getAllNotesById=async(token)=>{
const res=await axios.get(URL+"notes/get-userNotes",{
    headers:{
        token
    }
})
return res
}


export const deletetheNoteById=async(id)=>{
  
    const res=await axios.delete(URL+`notes/delete-note/${id}`)
    return res

}

export const createNotes=async(title,content,token)=>{

const response=await axios.post(URL+"notes/createNote",{title,content},{
    headers:{
        token
    }
})
return response;
}

export const updatheContent=async(title,content,noteId)=>{
    const res=await axios.put(URL+`notes/edit-note/${noteId}`,{title,content})

    return res
}

export const getUserNameById=async(token)=>{
    const res=await axios.get(URL+"user/getUserName",{
        headers:{
            token
        }
    })
    return res
}