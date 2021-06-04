import React, {Component} from 'react';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems';
import About from '../../components/About/About';
import MainItems from './MainItems/MainItems';
import Cafes from '../../components/Cafes/Cafes';
import Footer from '../../components/Footer/Footer.js';
import Register from '../../components/Register/Register.js';
import Login from '../../components/Login/Login.js';
import Profile from '../../components/Profile/Profile.js';
import MyCafe from '../../components/MyCafe/MyCafe.js';
import EditProfile from '../../components/Profile/EditProfile/EditProfile.js'
import CafeRegister from '../../components/CafeRegister/CafeRegister.js';
import ContactPage from '../../components/Contact/ContactPage.js';
import CafeLogin from '../../components/CafeLogin/CafeLogin.js';
import { Route, Switch} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Main extends Component {
  state = {
    status: false
  };

  render() {
    const token = localStorage.getItem("token");

  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    this.state.status = true
  }

    return(
      <div>
        <NavigationItems log={this.state.status}/>
        <Switch>
          <Route path="/" exact component={MainItems} />
          <Route path="/whoweare" component={About} />
          <Route path="/filter" exact component={Cafes} />
          <Route path="/signup" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/profile" component={Profile} />
          <Route path="/mycafe" component={MyCafe} />
          <Route path="/partnership" component={CafeRegister} />
          <Route path="/editProfile" component={EditProfile} />
          <Route path="/cafeLogin" component={CafeLogin} />
        </Switch>
        <Footer />
      </div>
  );
  }
}

export default withRouter(Main);
