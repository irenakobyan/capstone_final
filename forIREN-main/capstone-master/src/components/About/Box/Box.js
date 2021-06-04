import React from 'react';
import classes from "./Box.module.css";

const boxes = (props) => (
  <div className={classes.box}>
    <img src={props.img} alt="icon"/>
    <p> {props.par} </p>
    <a href={props.link} className={classes.button1}>{props.but}</a>
  </div>
)

export default boxes;
