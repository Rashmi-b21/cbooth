import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import ImageSwiper from "react-native-image-swiper";
import logo from '../images/logo1.png';
import bgImage from '../images/splash.jpg';


class Splashscreen extends Component {
    componentDidMount(){
      setTimeout(() => {
        this.props.navigation.navigate('Login') 
      }, 2000);
    }
    render() {
    return (
      <View style={styles.container}>
        <Image source={logo}
        style={{width:100,height:100}}/>
        <Text style={styles.welcome}>
          Welcome to chat booth
        </Text>
        <Text style={{color: 'pink'}}>love to making friends</Text>
        </View>
    );
  }
}

export default Splashscreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#666666',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color: '#F5FCFF',
    },
});





                