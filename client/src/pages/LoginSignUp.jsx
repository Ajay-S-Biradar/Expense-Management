import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_CLOUDINARY, API_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom'

const LoginSignUp = () => {
  const [page,setPage] = useState('login')
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [profileImg, setProfileImg] = useState('');

  // const navigate = useNavigate();

  // useEffect(()=>{
  //   const token = getToken();
  //   if(!verifyUserLogin()){
  //     navigate('/login');
  //   }
  // })

  const imgErr = ()=>{

  }

  const postd = async (pic)=>{
    if(!(pic.type==="image/jpeg" || pic.type==="image/png")){
      imgErr();
      return ;
    }
    const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "t8nw7lbc");
      data.append("cloud_name","dvwtbviaw");

    try {
      const res = await axios.post(API_CLOUDINARY, data);
      const file = res;
      console.log(file);
      setProfileImg(file?.data?.secure_url)
    } catch (error) {
        console.log(error);
    }
  }

  const fillAllCredentials = ()=>{
    console.log("Fill all credentials")
  }

  const handleLogin =async ()=>{
    //login
    if(page!=="login"){
      return;
    }
    if(!(password || username)){
      fillAllCredentials();
    }
    const res =await axios.post(API_URL+'signin', {
      username,
      password
    })
    console.log(res);
    //Sign Up
  }
  const handleSignUp = async ()=>{
    if(!(password && username && email)){
      fillAllCredentials();
    }
    const res =await axios.post(API_URL+'signup', {
      username,
      password,
      email
    })
    setPage("login");
    console.log(res);
  }

  return (
    <div className='w-full h-full flex justify-center items-center flex-col gap-4 bg-[#094962]'>
      <div className='w-[35%] shadow-2xl rounded-lg p-2 m-2'>
        <div className='flex justify-center text-5xl font-semibold p-3 m-2'>
          {page==="login"? "Login ": "Sign Up"}
        </div>
        <div className='text-2xl flex font-semibold justify-center flex-col gap-8 m-5'>
          <div className='flex flex-col gap-4'>
            <h1 className=''>Username</h1>
            <input className='p-2 text-lg rounded-lg' type="text" placeholder='Enter the username' 
            onChange={(e)=> setUsername(e.target.value)}/>
          </div>
          {
            page==="signup" &&
            <>
            <div className='flex flex-col gap-4'>
              <h1 className=''>Email</h1>
              <input className='p-2 text-lg rounded-lg' type="text" placeholder='Enter the Email'
              onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className='flex items-center gap-4'>
            <h1 className=''>Image</h1>
            <input className='p-2 text-sm rounded-lg' type="file" 
            onChange={(e)=> postd(e.target.files[0])}/>
          </div>
          </>
          }
          <div className='flex flex-col gap-4'>
            <h1 className=''>Password</h1>
            <input className='p-2 text-lg rounded-lg' type="text" placeholder='Enter the password'
            onChange={(e)=> setPassword(e.target.value)}/>
          </div>
          <div className='text-center'>
            {page=="login" ? <button type="button" 
            onClick={handleLogin}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Login
            </button>
            :
            <button type="button" 
            onClick={handleSignUp}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Sign Up
            </button>
            }
          </div>
        </div>
        {page==="login" ? <div className='text-center font-medium m-2 p-2'>
          <p>New user... <span className='underline cursor-pointer' onClick={()=> setPage("signup")}>SignUp</span></p>
        </div>: 
        <div className='text-center font-medium m-2 p-2'>
          <p>Already a user... <span className='underline cursor-pointer' onClick={()=> setPage("login")}>Login</span></p>
        </div>
        }
      </div>
    </div>
  )
}

export default LoginSignUp