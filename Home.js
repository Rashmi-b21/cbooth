import React, {Component} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ToastAndroid,ScrollView } from 'react-native';
//import axios from 'axios';
import { userList,logout } from '../actions/userAction';
import { connect } from 'react-redux';
import {Avatar, Divider,Caption,Title} from 'react-native-paper';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            messages: [],
            searchkey: ''
        };
    }

    componentDidMount() {
        this.props.onUserList();
    }
     goChat = (userid, name) => {
         this.props.navigation.navigate('Chat', {userid: userid, name: name});
     }
     
     componentDidUpdate(nextProps) {
        if(this.props.userReducer && this.props.userReducer.userList && this.props.userReducer.userList!==nextProps.userReducer.userList && this.props.userReducer.userListSuccess===true) {
            this.setState({users:this.props.userReducer.userList});
        }
        if(this.props.userReducer && this.props.userReducer.userLogoutSuccess===true) {
            this.props.navigation.navigate('Login');
        }
    }
    async logout() {
        this.props.logout();
    }
   /* getUserList = async () => {
        let that = this;
        axios.get('http://192.168.43.137:8082/userlist')
        .then(function (response) {
            if(response && response.data) {
                that.setState({users:response.data});
            } else if(response && response.data && response.data.message) {
                Toast.show(response.data.message, 1000);
            }
        })
        .catch(function (error)
        {
            console.log(error);
        });
    }*/
    render() {
        const { users } = this.state;
        return (
            <ScrollView>
            <View style={styles.container}>
                {users && users.length>0 ?
                <View>
                    {users.map((item, index) => {
                        if(this.props.userReducer && this.props.userReducer.userAuth && item._id != this.props.userReducer.userAuth._id){
                        return ( 
                            <TouchableOpacity onPress={()=>this.goChat(item._id, item.name)} key={index}>
                                <View style={{flexDirection: 'row', marginTop: 15, marginLeft:5}}>
                                <Avatar.Image
                            source={{
                                uri: 'https://sdl-stickershop.line.naver.jp/stickershop/v1/product/1212585/iphone/main@2x.png'
                            }}
                            size= {50}
                            />
                                <Text style={{fontSize: 18,marginTop: 10,paddingLeft: 10,fontWeight: item.readed ? null : 'bold'}}>
                                   {item.name}
                               </Text>
                                </View>
                                <Divider style={styles.divider} />
                            </TouchableOpacity>
                        );
                        }
                    })}
            </View>:null}
            <View style={{justifyContent: 'center',alignItems: 'center' ,marginTop: 40}}>
            <TouchableOpacity style = {styles.submitButton}
            onPress= {() => this.logout()}>
           
            <Text style={{color: 'black', fontWeight: 'bold', textAlign:'center'}} >LOGOUT</Text>
            </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
            
          
        )
    }
}

function mapStateToProps(state) {
    return {
        userReducer: state.userReducer
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onUserList: () => dispatch(userList()),
        logout: () => dispatch(logout())
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);


const styles = StyleSheet.create({
    container: {
        fontSize: 20,
        alignItems: 'center',
        fontWeight: 'bold',
        backgroundColor: '#FFCC00'
    },
  // ic:{
    //     fontSize:20
    //}
    
});