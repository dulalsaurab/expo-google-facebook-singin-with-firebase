import React, { Component } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Platform,
  Text,
  View, Alert,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import OAuthManager from 'react-native-oauth';

const manager = new OAuthManager('sadhan-sahitya')
manager.configure({
  google: {
    client_id: '368494892603-0rlp169apn7r2sfaj42sag9054nb6fb1.apps.googleusercontent.com',
    client_secret: 'ZinpYI91rqR45Alm4aoqfev1',
    callback_url: `myapp://`
  }
});

export default class App extends Component {

  handleLogin() {

    manager.authorize('google', {scopes: 'email'})
    .then(resp => console.log(resp))
    .catch(err => console.log(err));
  }
  handleLogout() {
    manager.deauthorize('google');
  }

  render() {
    manager.deauthorize('google');
    return (
            <View style={styles.content}>
              <Text style={styles.header}>
                hello world

              </Text>
                      <View style={styles.buttons}>

                        <Icon.Button
                          name="google"
                          backgroundColor="#DD4B39"
                          onPress={this.handleLogin}
                          {...iconStyles}
                        >
                          Login With Google
                        </Icon.Button>

                        <Icon.Button
                          name="facebook"
                          backgroundColor="#DD4B39"
                          onPress={this.handleLogout}
                          {...iconStyles}
                        >
                          Logout
                        </Icon.Button>
                      </View>
                      <Text style={styles.header}>
                        <Text>{this.resp.toString()} asdjf lk</Text>

                      </Text>
            </View>
);}}

// <Icon.Button
//   name="facebook"
//   backgroundColor="#3b5998"
//   onPress={this.handleLogin}
//   {...iconStyles}
// >
//   Login with Facebook
// </Icon.Button>

// <TouchableHighlight onPress={this.handleLogin}>
//   <Text style={styles.header}>
//       Login
//   </Text>
// </TouchableHighlight>
//
// <TouchableHighlight onPress={this.handleLogout}>
//   <Text style={styles.header}>
//       Logout
//   </Text>
// </TouchableHighlight>


// export default class App extends Component {
//
//   state = {
//     user: undefined, // user has not logged in yet
//   };
//
//   // Set up Linking
//   componentDidMount() {
//     // Add event listener to handle OAuthLogin:// URLs
//     Linking.addEventListener('url', this.handleOpenURL);
//     // Launched from an external URL
//     Linking.getInitialURL().then((url) => {
//       if (url) {
//         this.handleOpenURL({ url });
//       }
//     });
//   };
//
//   componentWillUnmount() {
//     // Remove event listener
//     Linking.removeEventListener('url', this.handleOpenURL);
//   };
//
//   handleOpenURL = ({ url }) => {
//     // Extract stringified user string out of the URL
//     const [, user_string] = url.match(/user=([^#]+)/);
//     this.setState({
//       // Decode the user string and parse it into JSON
//       user: JSON.parse(decodeURI(user_string))
//     });
//     if (Platform.OS === 'ios') {
//       SafariView.dismiss();
//     }
//   };
//
//   // Handle Login with Facebook button tap
//   loginWithFacebook = () => this.openURL('https://10.0.0.139:3000/auth/facebook');
//
//   // Handle Login with Google button tap
//   loginWithGoogle = () => this.openURL('https://10.0.0.139:3000/connect/google/');
//
//
//   // Open URL in a browser
//   openURL = (url) => {
//     // Use SafariView on iOS
//     if (Platform.OS === 'ios') {
//       SafariView.show({
//         url: url,
//         fromBottom: true,
//       });
//     }
//     // Or Linking.openURL on Android
//     else {
//       Linking.openURL(url);
//     }
//   };
//
  // render() {
  //   const { user } = this.state;
  //   return (
  //     <View style={styles.container}>
  //       { user
  //         ? // Show user info if already logged in
  //           <View style={styles.content}>
  //             <Text style={styles.header}>
  //               Welcome {user.name}!
  //             </Text>
  //             <View style={styles.avatar}>
//                 <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
//               </View>
//             </View>
//           : // Show Please log in message if not
//             <View style={styles.content}>
//               <Text style={styles.header}>
//                 Welcome Stranger!
//               </Text>
//               <View style={styles.avatar}>
//                 <Icon name="user-circle" size={100} color="rgba(0,0,0,.09)" />
//               </View>
//               <Text style={styles.text}>
//                 Please log in to continue {'\n'}
//                 to the awesomness
//               </Text>
//             </View>
//         }
//         {/* Login buttons */}
//         <View style={styles.buttons}>
//           <Icon.Button
//             name="facebook"
//             backgroundColor="#3b5998"
//             onPress={this.loginWithFacebook}
//             {...iconStyles}
//           >
//             Login with Facebook
//           </Icon.Button>
//           <Icon.Button
//             name="google"
//             backgroundColor="#DD4B39"
//             onPress={this.loginWithGoogle}
//             {...iconStyles}
//           >
//             Or with Google
//           </Icon.Button>
//         </View>
//       </View>
//     );
//   }
// }
//
const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
  },
});
