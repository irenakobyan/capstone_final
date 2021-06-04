import React from 'react';
import PartnerItems from '../../../components/Partners/PartnerItems';
import MissionItems from '../../../components/Mission/MissionItems';
import About from '../../../components/About/About';
import Text from '../../../components/Text/Text.js';
import backImg from '../../../assets/backImg.jpeg';
import classes from '../Main.module.css';


const mainItems = () => (

  <div>
    <div>
      <div className={classes.MainItems}>
      <Text head="WELCOME TO HARISSA"
            par="Here in Harissa we'll help you find the best restaurants and cafes located in Yerevan. Check their menus, watch their reviews and RESERVE a table for the evening." />
      </div>
      <img src={backImg}
           alt="logo"
           style={{width: '100%',
                   position: 'relative',
           }}
                   />
    </div>

    <MissionItems />
    <PartnerItems />
    <About />

  </div>
)

export default mainItems;
