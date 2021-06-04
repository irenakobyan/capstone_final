import React from 'react';
import Box from '../../About/Box/Box.js';
import classes from '../../About/About.module.css';
import contact from '../../../assets/contact.png';
import user from '../../../assets/user.png';

const BoxesContact = () => (
 
        <div className={classes.AboutUs}>
          <div className={classes.boxes}>
          <Box
        img={contact}
        par="Email: getinfo@harissa.am  Phone: +374 (10) 288888"
        but="Help & Contacts"
         />
      <Box
        img={user}
        par="Email: partnership@harissa.am  Phone: +374 (10) 277777"
        but="Become Our Partner"
        link="/partnership"
         />
      </div>

    </div>
)

export default BoxesContact;
