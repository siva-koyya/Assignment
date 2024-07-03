import React, { useEffect } from 'react'
import { ThemeProvider, ColorModeProvider } from "@chakra-ui/react"
import Nav from './Nav'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Home({children}) {
  let userCredentials =useSelector((state)=>state.user.credentials);
  let isLogin =useSelector(state=>state.user.isLogin)
  let navigate =useNavigate()
  console.log(userCredentials,"--->HomecredentiL")
  function IsCredentials (){
    if(isLogin===false){
      navigate('/')
    }
  }
  useEffect(()=>{
    IsCredentials()
  },[])
  return (
   <div>
      <Nav/>
      <Outlet/>
   </div>
  )
}

export default Home