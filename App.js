import React, { Component } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Platform,
  Text,
  View
} from 'react-native';

import Expo from 'expo';
import * as firebase from 'firebase';


//initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBwCZk-JT3oG-HwZs6_4AIm6KTJ37TR61A",
    authDomain: "csca-test.firebaseapp.com",
    databaseURL: "https://csca-test.firebaseio.com",
    projectId: "csca-test",
    storageBucket: "",
};
firebase.initializeApp(firebaseConfig);

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

export default class App extends React.
Component {
//constructor 
  constructor(props){
    super(props)
    this.state = ({
        signedIn: false,
        user_data: undefined,
        isValid: undefined,
        email: '',
        password: ''
    })
  }
  
signUpUsers = (email, password) => {
    try {
        if (this.state.password.length < 6) {
            alert("Please enter atleast 6 characters")
            return;
          }
          firebase.auth().createUserWithEmailAndPassword(email, password)

    } catch (error) {
        console.log(error.toString())   
    }
  } 

loginUser = (email, password) => {
    try {
        firebase.auth().signInWithEmailAndPassword(email,password).then(
            jsonResponse => {
                this.setState({
                    user_data: jsonResponse
                })
            }
        )
      } catch (error) {
          console.log(error.toString())
      }
  }

async loginWithFacebook(){
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync
    ('649369955436717', { permissions: ['public_profile', 'email', ]})
    if(type == 'success') {
        const credential = firebase.auth.FacebookAuthProvider.credential(token)
        firebase.auth().signInAndRetrieveDataWithCredential(credential)
        .then((user) =>{    
            if(user.additionalUserInfo){
                console.log("No additionalUserInfo Object returned")
              } else {
                console.log("additionalUserInfo Object returned, im Happy!", user.additionalUserInfo)
              }
        }).
        catch( error => {
            console.log(error)
        })
    
    }
}

loginWithGoogle = async () => {
    try {
        const result = await Expo.Google.logInAsync({
            androidClientId:"767329949917-foc66elv192e7a5evih0cullemcvt95p.apps.googleusercontent.com",
            iosClientId: "767329949917-0o2p19n5ig4nnrlkc922rf5gpqmbv0es.apps.googleusercontent.com",
            scopes: ["profile", "email"]
        })
        if (result.type === "success") {
            var temp_data = { email: result.email,
                              name: result.user.name,
                              photoURL: result.user.photoUrl
                              };
            this.setState({
                signedIn: true,
                user_data: temp_data
        })
            console.log(result)
        } else {
            console.log("cancelled")
        }
    } 
    catch (e) {
            console.log("error", e)
        }
}

componentDidMount(){
    firebase.auth().onAuthStateChanged( user => {
        if(user != null){
            var temp_data = {
                email: user.displayName,
                name: user.displayName,
                photoURL: user.photoURL
            }
            this.setState({
                user_data: temp_data,
                isValid: true
            })
        }
    })
}

signOutUser = async () => {
    try {
        await firebase.auth().signOut();
        user_data: undefined;
        isValid: undefined;
        navigate('Auth');
    } catch (e) {
        console.log(e);
    }
this.setState({user_data: undefined, isValid: false});
}

  render() {
    const { user_data } = this.state;
    const { isValid } = this.state;
    return (
        <Container style={styles.container}>
        <Text style={styles.header}>
                Welcome to Nepal Sahitya {"\n"}
        </Text>
        { user_data? (
            <View style={styles.content}>
              <Text style={styles.header}>
                Welcome {user_data.displayName} {"\n"}
              </Text>
                  <View>
                    {user_data.photoURL ? (
                        <Image source={{ uri: user_data.photoURL }} style={styles.avatarImage} />  
                    ) : (
                        <Text>{user_data.displayName}</Text>
                    )}
                    </View>    
            <Button style={styles.button}
                full
                rounded
                Primary 
                onPress={()=> this.signOutUser()}
            >
            <Text style={{color: 'white'}}>Logout, Go home kid!!  </Text>
            </Button>
            </View>
        )
        :
            (
            <Form>
                <Item floatingLabel>
                    <Label>Email </Label>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={(email)=>this.setState({email})}
                    />
                </Item>
                <Item floatingLabel>
                    <Label>Password </Label>
                    <Input
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={(password)=>this.setState({password})}
                    />
                </Item>

                <View style={styles.inline}>
                    <Button style={styles.loginButton}
                        full
                        rounded
                        success
                        onPress ={()=> this.loginUser(this.state.email, this.state.password)} 
                    >
                        <Text style={{color: 'white'}}>Login </Text>
                    </Button>
                    <Button style={styles.loginButton}
                        full
                        rounded
                        Primary 
                        onPress={()=> this.signUpUsers(this.state.email, this.state.password)}
                    >
                        <Text style={{color: 'white'}}>SignUp</Text>
                    </Button>
                </View>
                <View
                    style={{
                        marginTop: 100,
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        margin: 20
                    }}
                />
                <Button style={styles.button}
                    full
                    rounded
                    Primary 
                    onPress={()=> this.loginWithFacebook()}
                >
                    <Text style={{color: 'white'}}>Login With Facebook  </Text>
                </Button>

                <Button style={styles.button_google}
                    full
                    rounded
                    Primary 
                    onPress={()=> this.loginWithGoogle()}
                >
                    <Text style={{color: 'white'}}>Login With Google  </Text>
                </Button>
            </Form>
            )}
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  textRegister: {
    color: "grey",
    marginVertical: 10,
    paddingHorizontal: 10,
    marginLeft: 5,
    justifyContent: 'center',

},
inline: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
 loginButton: {
    marginTop: 30,
    margin: 20,
    width: 150
 },
 button: {
    marginTop: 10,
    margin: 20,
 },
 button_google: {
    marginTop: 10,
    margin: 20,
    backgroundColor: '#F44A4B'
 },
 content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: 20,
    
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
    justifyContent: 'center',
    marginTop: 50,
    marginLeft: 90
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
});
