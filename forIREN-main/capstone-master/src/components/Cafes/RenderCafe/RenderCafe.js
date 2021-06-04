import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import classes from "./RenderCafe.module.css";
import Select from 'react-select';

export default function RenderCafe(props) {
  const [cafes, setCafes] = useState([]);
  
  const cuisine = [
    {value:"Breakfast",label:"Breakfast"},
    {value:"Lunch",label:"Lunch"},
    {value:"Dinner",label:"Dinner"},
    {value:"Burger & Sandwich",label:"Burger & Sandwich"},
    {value:"Fast Food",label:"Fast Food"},
    {value:"Pizza",label:"Pizza"},
    {value:"BBQ, Kebab",label:"BBQ, Kebab"},
    {value:"Sushi",label:"Sushi"},
    {value:"Chicken Grill",label:"Chicken Grill"},
    {value:"Khash",label:"Khash"},
    {value:"Lahmajo",label:"Lahmajo"},
    {value:"Asian",label:"Asian"},
    {value:"Dessert", label:"Dessert"},
    {value:"Coffee and Tea",label:"Coffee and Tea"},
  ];

  const location = [
    {value:"Ajapnyak", label:"Ajapnyak"},
    {value:"Arabkir", label:"Arabkir"},
    {value:"Avan", label:"Avan"},
    {value:"Davtashen", label:"Davtashen"},
    {value:"Erebuni", label:"Erebuni"},
    {value:"Davtashen", label:"Davtashen"},
    {value:"Kanaker-Zeytun", label:"Kanaker-Zeytun"},
    {value:"Kentron", label:"Kentron"},
    {value:"Malatia-Sebastia", label:"Malatia-Sebastia"},
    {value:"Nork-Marash", label:"Nork-Marash"},
    {value:"Nubarashen", label:"Nubarashen"},
    {value:"Shengavit", label:"Shengavit"},
  ];

  const activity = [
    {value:"Work & Study", label:"Work & Study"},
    {value:"Friends Time", label:"Friends Time"},
    {value:"Music and Concerts", label:"Music and Concerts"},
    {value:"Hookah & Cigars", label:"Hookah & Cigars"},
    {value:"Friends Time", label:"Friends Time"},
    {value:"Friday Night", label:"Friday Night"},
    {value:"Wine & Cheese", label:"Wine & Cheese"},
    {value:"For Kids", label:"For Kids"},
  ];

  const [values, setValues] = useState({
    cuisine:"",
    district:"",
    tags: ""
  });

  const handleChangeTwo = (e)=>{
    let result = e.map(a => a.value);
    if(result.length === 0) {
      result = "";
    }
    setValues({...values , cuisine:result}); 
    }

    const handleChangeOne = (e)=>{
      let result = e.map(a => a.value);
      if(result.length === 0) {
        result = "";
      }
      setValues({...values , district:result}); 
      }

  const handleChange = (e)=>{
    let result = e.map(a => a.value);
    if(result.length === 0) {
      result = "";
    }
    setValues({...values , tags:result}); 
    }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const {tags, cuisine, district } = values
 
    return  axios.post(`http://localhost:8050/cafes/filter?tags=${values.tags}`, { 
      cuisine,
      district,
      tags
    });
  };

let history = useHistory();
  async function fetchCafesFromServer() {
    const {tags, cuisine, district } = values
    const result = await axios.post("http://localhost:8050/cafes/filter", { 
      tags,
      cuisine, 
      district
    });
   setCafes(result.data);
  }

  useEffect(() => {
    fetchCafesFromServer();
  },[values]);

  const filteredCafes = cafes.filter((cafe) => {
    return cafe.name.toLowerCase().indexOf(props.search.toLowerCase()) !== -1;
  });

  return (
    <div className={classes.AllIn}>
       <div>
       <form className={classes.form} onSubmit={handleFormSubmit}>
       
        <h1>Sort by</h1>

        <div className={classes.sort}>
          <h3>Cuisine</h3>
          <Select options={cuisine} 
           isMulti
           onChange={handleChangeTwo}
           />
        </div>

        <div className={classes.sort}>
          <h3>District</h3>
          <Select options={location}
          isMulti 
           onChange={handleChangeOne}
           />
        </div>

        <div className={classes.sort}>
          <h3>Activity</h3>
          <Select options={activity} 
          isMulti
           onChange={handleChange}
           />
        </div>

          </form>
        </div>
    <div className={classes.renderCafe}>
     

    {filteredCafes.map((cafe) => (
      <div
        className={classes.eachCafe}
        onClick={() => {
          history.push("mycafe/" + cafe._id);
        }}
      >
        <img alt="cafeImage" src={cafe.selectedFile} style={{ width: "50%" }} />
        <p>
          <b>{cafe.name}</b> <br />
          Address: {cafe.street_name} <br />
          District: {cafe.district} <br />
        </p>
      </div>
    ))}
  </div>

   
    </div>
  );
}