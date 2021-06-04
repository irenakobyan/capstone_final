import React, { useEffect, useState} from 'react';
import classes from "./Profile.module.css";
import axios from "axios";
import Login from '../Login/Login.js';
import Box from '../About/Box/Box.js';
import Text from '../Text/Text.js';
import profile from '../../assets/profile.png';

export default function Profile() {
  const token = localStorage.getItem("token");

  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  }

  const [values, setValues] = useState({
    name: "",
    email: "",
    firstName: "",
    lastName: ""
  });
  
  async function fetchUserFromServer() {
    const result = await axios.get(`http://localhost:8050/users/me`);
    setValues(result.data);
  }

  useEffect(()=>{
    fetchUserFromServer();
  },[]);


  if(token){
    return(
        <div className={classes.profile}>
          <Box 
            img={profile}
            par = "Account Settings "
            but = "Change Account"
            link="editProfile" />
            <Text 
            head = {values.firstName + " "+ values.lastName}
            par = {"Username: " + values.username}
            par1 = {"Email: " + values.email} />
  
      </div>
    )
  }
  else {
    return(
    <Login />
    )
  }
}

