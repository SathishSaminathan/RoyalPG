//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Button } from 'react-native';

// create a component
class login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    loginHandler=(email,password)=>{
        this.props.getLoginUpHandler(email,password);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    {/* <Text>Email</Text> */}
                    <TextInput
                        ref={(input) => { this.emailField = input }}
                        style={{ height: 40 }}
                        onChangeText={(email) => this.setState({ email })}
                        placeholder="Enter Your Registered Email"
                        placeholderTextColor="white"
                        value={this.state.email}
                        keyboardType="email-address"
                        onSubmitEditing={()=>{this.passwordField.focus();}}
                        blurOnSubmit={false}
                        returnKeyType='next'                        
                    />
                    <TextInput
                        ref={(input) => { this.passwordField = input }}
                        style={{ height: 40 }}
                        onChangeText={(password) => this.setState({ password })}
                        placeholder="Enter Your Password"
                        placeholderTextColor="white"
                        value={this.state.password}
                        returnKeyType='done'
                    />
                    <Button
                        // onPress={() => alert(this.state.email + " " + this.state.password)}
                        onPress={()=>{this.loginHandler(this.state.email,this.state.password)}}
                        title="LOGIN"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#2c3e50',
        width: '100%'
    },
    inputContainer: {
        // backgroundColor: 'red',
        padding: 20
    }
});

//make this component available to the app
export default login;
