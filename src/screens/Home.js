//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ListView,TextInput,YellowBox } from 'react-native';
import * as firebase from "firebase";
import { Container, Header, Content, Input, Item, Button, Icon, List, ListItem, Footer } from "native-base";

import { firebaseConfig } from "../config/configSettings";

var data =[];

// create a component
class Home extends Component {

    constructor(props){
        super(props);
        YellowBox.ignoreWarnings(['Setting a timer']);

        this.ds= new ListView.DataSource({ rowHasChanged : (r1,r2)=> r1 !== r2})

        this.state={
            listViewData: data,
            newContact:""
        }
    }

    componentDidMount(){

        var that = this;

        firebase.database().ref("/contacts").on("child_added",function(data){

            var newData = [...that.state.listViewData]
            newData.push(data);
            that.setState({
                listViewData:newData
            })
        })
        // this.refresh(that);

        // firebase.database().ref("/contacts").on("child_removed",function(data){

        //     var newData = [...that.state.listViewData]
        //     newData.push(data);
        //     that.setState({
        //         listViewData:newData
        //     })
        // })
    }

    addRow=(data)=>{
        this.textinputField.clear();
        var key = firebase.database().ref("/contacts").push().key;
        firebase.database().ref("/contacts").child(key).set({name:data})

    }

    async deleteRow(secId,rowId,rowMap,data){

        await firebase.database().ref("contact/" + data.key).set(null)
        
        rowMap[`${secId}${rowId}`].props.closeRow();

        var newData = [...this.state.listViewData]
        newData.splice(rowId,1)
        this.setState({
            listViewData:newData
        })
    }

    showInfo=()=>{
        
    }
    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <List 
                        enableEmptySections 
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data =>
                        <ListItem>
                            <Text 
                                style={{ padding:10,fontSize:24, fontWeight:"bold", color:"pink", fontStyle:"italic"}}
                                onLongPress={()=>alert(data.val().name)}
                            >{data.val().name}</Text>
                        </ListItem>
                        }
                        renderLeftHiddenRow={data=>
                            <Button full
                                onPress={()=> this.addRow(data)}
                            >
                                <Icon name="information-circle"/>
                            </Button>
                        }
                        renderRightHiddenRow={(data, secId,rowId,rowMap)=>
                            <Button full danger
                            onPress={()=> this.deleteRow(secId,rowId,rowMap,data)}
                            >
                                <Icon name="trash"/>
                            </Button>
                        }
                        leftOpenValue={100}
                        rightOpenValue={-100}
                    />
                </Content>
               <Footer style={{marginTop:StatusBar.currentHeight,backgroundColor:"#fff"}}>
                   <Content style={{backgroundColor:"#fff"}}>
                       <Item style={{ backgroundColor: '#fff', borderColor: 'transparent',position:"relative"}}>
                            <TextInput
                                style={{borderRadius:50, flex:1, borderWidth:1,borderRadius:20, borderColor:"green"}}
                                ref={(input) => { this.textinputField = input }}
                                onChangeText={(newContact)=>this.setState({newContact})}
                                placeholder="Type Text..."
                                returnKeyType="send"
                                onSubmitEditing={()=> {this.addRow(this.state.newContact)}}
                                underlineColorAndroid="transparent"
                            />
                            <Button 
                                style={{height:"100%",borderRightWidth:1,borderLeftWidth:0,borderRadius:20, position:"absolute",right:0,paddingHorizontal:10 }}
                                full
                                success
                                onPress={()=> this.addRow(this.state.newContact)}
                            >
                                <Icon name="send" />
                            </Button>
                       </Item>
                    </Content>
                </Footer>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default Home;
