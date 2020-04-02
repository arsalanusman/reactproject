import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"

import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { API } from 'aws-amplify';

import awsmobile from './../aws-exports';

Amplify.Logger.LOG_LEVEL = 'DEBUG';
Amplify.configure(awsmobile);

export class App extends React.Component {

 postData() { 
    let apiName = 'api595d75c2';
    let path = '/register';
    let myInit = { // OPTIONAL
        body: {
          email: "sdfg@sdg.com",
          password: "asdfasdf",
          name: "asdf",
          image: "http://gravatar.com/avatar/1585840307?d=identicon"
        }, // replace this with attributes you need
    }
    return API.post(apiName, path, myInit);
}


  componentDidMount(){
    
   var apiData = API.get('api595d75c2','/users');
    console.log(apiData, 'testing')
    this.postData()
  }
  render(){
    return (
      <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar />
        <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
          </Switch>
        </div>
        <Footer />
      </Suspense>
    );
  }
}

export default App;
