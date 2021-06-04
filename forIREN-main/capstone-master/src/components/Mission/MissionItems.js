import React from 'react';
import Text from '../Text/Text.js';
import classes from './MissionItems.module.css';
import mission from '../../assets/mission.jpg';

const missionItems = () => (
  <div className={classes.Mission}>
    <div>
      <img alt="Mission" src={mission} />
    </div>
    <div>
    <Text head="Our Mission" par="HARRISSA has a mission of providing you with the best choices of cafes and restaurants situated in Yerevan. With us you will spend your breakfast, lunch and dinner in the most delicious, aesthetic and suitable for you locations of Yerevan." />
    </div>
  </div>
)

export default missionItems;
