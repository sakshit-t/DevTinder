import React, {useEffect} from 'react'
import Navbar  from './Navbar';
import Footer from './footer';  
import { Outlet,useNavigate } from 'react-router-dom';
import { BASE_URL }   from '../utils/constants';
import {useDispatch,useSelector} from "react-redux";
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import {} from '../utils/userSlice';
const Body = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const userData=useSelector((store)=>store.user?.user);
  const fetchUser= async()=>{
    try{
      const res=await axios.get(BASE_URL+"/profile/view",{
        withCredentials:true,
    });
    dispatch(addUser(res.data));
  } catch(err){
    if( err.response?.status===401){
    navigate("/login");
    }
    console.log(err);
  }
};

useEffect(() => {
  if (!userData?.user) {
    fetchUser();
  }
}, [ userData]);
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
 export default Body
