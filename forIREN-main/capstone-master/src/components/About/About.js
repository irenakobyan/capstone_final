import React from 'react';
import Box from './Box/Box';
import Text from '../Text/Text.js';
import classes from './About.module.css';
import user from '../../assets/user.png';
import furniture from '../../assets/furniture.png';
import contact from '../../assets/contact.png';


const aboutUs = () => (
  <div className={classes.AboutUs}>
      <Text head="Who We Are" par="HARRISSA is a team of four enthusiastic and motivated young women. We care about your time spent well and productive. As of being students and employees of IT companies in the difficult times of COVID-19, we've understood that choosing correct location for studying, working or meeting partners is the key to success. We've decided to create the platform HARRISSA to allow people filter and access the cafes and restaurants appropriate for them." />
    <div className={classes.boxes}>
      <Box par="Log In or Create an Account and Start filtering NOW" but="Log In" img={user} link="/login" />
      <Box par="Search for the best option and reserve your seat NOW!" but="Filter" img={furniture} link="/filter" />
      <Box par="Contact Us anytime if you have additional questions" but="Contact Us" img={contact} link="/contact" />
    </div>
  </div>
)

export default aboutUs;
