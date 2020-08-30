import React, {Component} from 'react';
//import axios from 'axios';
//import Toast from 'react-native-simple-toast';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground } from 'react-native';
import {userLogin} from '../actions/userAction';
import {connect} from 'react-redux';
import bgImage from '../images/loginbackground.jpg';
import logo from '../images/logo1.png';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            
        };
        this.validateForm = this.validateForm.bind(this);
    }
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }
    /*componentDidMount () {
        this.props.userAuth()
    }*/
    validateForm(){
        const { errors } = this.state;
        const emailaddr = this.state.email;
        const pass = this.state.password;
        const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
        if (emailaddr === '') {
            errors.email = "Email address cannot be empty";
        }
        else if (emailaddr.length > 0 && !reg.test(emailaddr)) {
            errors.email = "Please provide correct email address";
        } else {
            errors.email = '';
        }
        
        if (pass === '') {
            errors.pass = "Password cannot be empty";
        } else if (pass && pass.length < 5) {
            errors.pass = "password should be more than 5 character.";
        } else {
            errors.pass = '';
        }
        this.setState({ errors})
        if(errors.email==='' && errors.pass==='') {
           //this.submitForm();
           const userinfo={
               email:this.state.email,
               password: this.state.password
           }
           this.props.onLogin(userinfo)
        }
    }
    /*submitForm = async () => {
        let that = this;
        axios.post('http://192.168.43.137:8082/loginuser', {
            email: this.state.email,
            password: this.state.password
        })
        .then(function (response) {
           if(response && response.data && response.data._id) {
               that.props.navigation.navigate('Home');
           } else if(response && response.data && response.data.message) {
             Toast.show(response.data.message, 500);
             }
            })
        .catch(function (error) {
            console.log(error);
        });
    }*/
    goToRegister = () => {
        this.props.navigation.navigate('Register')
    }
    componentDidUpdate(nextProps) {
        if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!==nextProps.userReducer.userAuth && this.props.userReducer.userAuthSuccess===true) {
        this.props.navigation.navigate('Home');
        }
      }
        render() {
        const { errors } = this.state;
        return (
            
            <ImageBackground source={bgImage} style = {styles.imageBackground}>
            
            <View style = {styles.container}>
                <View>
               <Image 
               source ={logo}
               style={{width: 59,height: 50, margin:15}}
               />
               </View>        
                 <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Email"
                placeholderTextColor = "#000"
                autoCapitalize = "none"
                onChangeText = {this.handleEmail}/>
                
             
            <Text style={styles.errorstyle}>{errors.email}</Text>
                <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Password"
                placeholderTextColor = "#000"
                autoCapitalize = "none"
                onChangeText = {this.handlePassword}/>
               <Text style={styles.errorstyle}>{errors.pass}</Text>
               
                <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                    () => this.validateForm()
                }>
                    <Text style = { styles.submitButtonText }> Login </Text>
                </TouchableOpacity>
                <TouchableOpacity
                style = {styles.buttonStyle}
                onPress = {
                    () => this.props.navigation.navigate('Register')
                    }>
          <Text style={styles.buttonTextStyle}>New here? Signup</Text>
        </TouchableOpacity>
        </View>
        
        </ImageBackground>
        
        );
    }
}
function mapStateToProps(state) {
 
    return{
        userReducer: state.userReducer
    };
}
function mapDispatchToProps(dispatch)
{
    return{
        onLogin: (userinfo) => dispatch(userLogin(userinfo)),
        userAuth: () =>dispatch(userAuzth())
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        //backgroundColor: '#666666'
    
        
    },
        input: {
        margin: 10,
        height: 40,
        //borderColor: '#000',
        //borderWidth: 1,
        width: '70%',
        padding: 10,
        fontSize: 16,
        lineHeight: 20,
        color: '#000',
        borderRadius: 10,
        backgroundColor: 'white',
    },
    imageBackground: {
        height: null,
        width: null,
        flex:1
    },
   
    submitButton: {
        backgroundColor: '#000',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 10,
    },
    submitButtonText:{
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    buttonStyle: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
      },
      buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
      }           
})
