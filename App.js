/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Tabs from 'react-native-tabs';
import * as firebase from "firebase";

//Initialize firebase
const firebaseConfig = {
    apiKey: "AIzaSyANosw6ybvyswsg-13TykmL1Jgmc5TJHLg",
    authDomain: "royalpg-a1245.firebaseapp.com",
    databaseURL: "https://royalpg-a1245.firebaseio.com",
    projectId: "royalpg-a1245",
    storageBucket: "royalpg-a1245.appspot.com",
    messagingSenderId: "702411412611"
};

firebase.initializeApp(firebaseConfig);

import Login from "./src/screens/login";
import SignUp from "./src/screens/signup";
import Home from "./src/screens/Home";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 'login' };
    this.signUpHandler = this.signUpHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }
  
  signUpHandler(email,password){

    try{

      if(password.length<6){
        alert("Please enter password altease 6 characters");
        return;
      }  

      firebase.auth().createUserWithEmailAndPassword(email,password)
      this.setState({
        page:"signUp"
      })

    }
    catch(error){
      console.log(error.toString())
    }
  }

  loginHandler(email,password){

    try{

      if(password.length<6){
        alert("Please enter password altease 6 characters");
        return;
      }  

      firebase.auth().signInWithEmailAndPassword(email,password).then(function (user){
        console.log(user)
      })

    }
    catch(error){
      console.log(error.toString())
    }
  }

  render() {
    var self = this;
    return (
      // <View style={styles.container}>
      //   {this.state.page == "login" ? <Login getLoginUpHandler={this.loginHandler} /> : <SignUp getSignupHandler={this.signUpHandler} />}
      //   <Tabs selected={this.state.page} style={{ backgroundColor: 'white' }}
      //     selectedStyle={{ color: 'red' }} onSelect={el => this.setState({ page: el.props.name })}>
      //     <Text name="login" selectedIconStyle={styles.customTab}>LOGIN</Text>
      //     <Text name="signup" selectedIconStyle={styles.customTab}>SIGNUP</Text>
      //   </Tabs>
      // </View>
      <Home />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  customTab: {
    borderTopWidth: 2,
    borderTopColor: 'red'
  }
});
