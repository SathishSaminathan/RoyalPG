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
import Login from "./src/screens/login";
import SignUp from "./src/screens/signup";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 'login' };
  }
  render() {
    var self = this;
    return (
      <View style={styles.container}>
        {this.state.page == "login" ? <Login /> : <SignUp />}
        <Tabs selected={this.state.page} style={{ backgroundColor: 'white' }}
          selectedStyle={{ color: 'red' }} onSelect={el => this.setState({ page: el.props.name })}>
          <Text name="login" selectedIconStyle={styles.customTab}>LOGIN</Text>
          <Text name="signup" selectedIconStyle={styles.customTab}>SIGNUP</Text>
        </Tabs>
      </View>
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
