import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";
import logo from "../../../assets/logo.png";
import { NavLink } from "react-router-dom";
import axios from "axios";

const token = localStorage.getItem("token");

if (token) {
  axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
}

const imageClick = () => {
  window.location.href = "http://localhost:3000/";
};

function NavigationItems(props) {

  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <div className={classes.NavigationItems}>
      <div>
        <NavigationItem>
          <NavLink to="/">Home</NavLink>
        </NavigationItem>
        <NavigationItem>
          <NavLink to="/whoweare"> Who we are </NavLink>
        </NavigationItem>
        <NavigationItem>
          <NavLink to="/filter"> Restaurants & Cafes </NavLink>
        </NavigationItem>
        </div>

        <img
          src={logo}
          alt="Logo"
          style={{ cursor: "pointer" }}
          onClick={imageClick}
        />

        {props.log ? 
          <div>
            <NavigationItem>
              <NavLink to="/profile"> My profile </NavLink>{" "}
            </NavigationItem>
            <NavigationItem>
              <NavLink to="/contact"> Contact </NavLink>{" "}
            </NavigationItem>
            <NavigationItem>
              <NavLink to="/" onClick={logout}> Log Out </NavLink>{" "}
            </NavigationItem>
          </div>
         : 
          <div>
            <NavigationItem>
              <NavLink to="/signup"> Sign up</NavLink>{" "}
            </NavigationItem>
            <NavigationItem>
              <NavLink to="/login"> Login </NavLink>{" "}
            </NavigationItem>
            <NavigationItem>
              <NavLink to="/contact"> Contact </NavLink>{" "}
            </NavigationItem>
          </div>
        }
      </div>

  );
}

export default NavigationItems;
