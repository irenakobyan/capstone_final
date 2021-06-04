import React, {useEffect, useState} from 'react';
import Text from '../Text/Text.js';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import classes from './PartnerItems.module.css';

export default function PartnerItems() {
  const [cafes, setCafes] = useState([]);

  let history = useHistory();

  async function fetchCafesFromServer() {
    const result = await axios.get('http://localhost:8050/cafes');
    setCafes(result.data);
}

useEffect(() => {
    fetchCafesFromServer();
}, []);

return (
<div  className={classes.PartnerAll}>
  <Text head="Our Partner Restaurants and Cafes" par="We work with more than 50 restaurants and cafes located in Yerevan!" />
   <div className={classes.PartnerItems}>
   { cafes.slice(0, 3).map((cafe) => (
          <div  className={classes.eachCafe} onClick={() => {
            history.push('mycafe/' + cafe._id)
          }}>
          <img alt="Partner" src={cafe.selectedFile} style={{width: '50%'}}/>
     <p>
         <b>{cafe.name}</b> <br />
        Address: {cafe.street_name} <br />
        District: {cafe.district} <br />
     </p>
       </div>
    
    ))}
    </div>
    <a href="/filter" className={classes.button1}>View More</a>
  </div>
)

};

