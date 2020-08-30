import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Splashscreen from './pages/Splashscreen';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Chat from './pages/Chat';

const AuthStackNavigator = createStackNavigator ({
    Splashscreen: {
        screen: Splashscreen,
        navigationOptions: {
            headerShown: false,
        },
    },
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false,
        },
    },
    Register: {
        screen: Register,
        navigationOptions: {
            headerShown: false,
        },
    },
});

const AppStackNavigator = createStackNavigator({
    

    Home: {
        screen: Home,
        navigationOptions: {
            title: 'My Friends',
        },
    },
    Chat: {
        screen: Chat,
        //navigationOptions: {
          //  title: 'Chat Room',
        //},
    },
 
});
   

const SwitchNavigator = createSwitchNavigator({
    AuthLoading: AuthStackNavigator,
    App: AppStackNavigator
},
{
    initialRouteName: 'AuthLoading'
});
    
const Navigation = createAppContainer(SwitchNavigator);
export default Navigation;
