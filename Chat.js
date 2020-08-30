import React, {Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity, TextInput,StatusBar, ImageBackground} from 'react-native';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import{ connect } from 'react-redux';
import {chatInsert, chatList} from '../actions/chatAction';
import { Avatar, IconButton} from 'react-native-paper';
import SocketIOClient from 'socket.io-client';
import { SERVERURL } from '../../config';
import bgImage from '../images/chatr.jpg';


type Props = {
    name?: string,
   
};

class Chat extends React.Component<Props> {
    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || 'Chat!',
    });

    state = {
        userid: this.props.navigation.state.params.userid,
        messages: [],
    };

   /* constructor(props) {
        super(props);
        this.state = {
            userid: this.props.navigation.state.params.userid,
            messages: []
        }
        this.onSend = this.onSend.bind(this);
    }*/
    componentDidMount() {
        this.socket = SocketIOClient('http://192.168.43.137:8082');
        const data = {
            receiver_id: this.props.navigation.state.params.userid,
            sender_id: this.props.userReducer.userAuth._id
        };
        this.socket.emit('getMessage', data);
        this.socket.on('receiveMessage', (chatlist) => {
            if(chatlist) {
                this.setState({messages: chatlist});
            }
        });
        /*setInterval(async () => {
            this.props.onGetMessage(data)
        },10000);*/
        
    }

    componentDidUpdate(nextProps) {
        
        if(this.props.chatReducer && this.props.chatReducer.chatList && this.props.chatReducer.chatList!=nextProps.chatReducer.chatList && this.props.chatReducer.chatListSuccess===true) {
            this.setState({
                 messages: this.props.chatReducer.chatList,
            });
        }
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    submitChatMessage(messages = []) {
        const date = new Date();
        const timestamp = date.getTime();
        this.onSend(messages)
        let details = {
            user: {
                _id: this.props.userReducer.userAuth._id
            },
            receiver_id: this.state.userid,
            sender_id: this.props.userReducer.userAuth._id,
            chatdate: date,
            text: messages && messages[0] && messages[0].text
        }
       // this.props.onChatMessage(details);
       this.socket.emit('chatMessage', details);
    }
    renderSend(props){
        return(
            <Send {...props} textStyle={{color: 'black',fontWeight: 'bold'}} label={'Send'} />
        );
    }
    renderAvatar = (props) => {
        return(
        <View style={{flexDirection: 'row', marginTop: 15, marginLeft:5}}>
        <Avatar.Image
    source={{
        uri: 'https://sdl-stickershop.line.naver.jp/stickershop/v1/product/1212585/iphone/main@2x.png'
    }}
    size= {30}
    /></View>
        );
   }
    renderBubble = (props) => {
     return(<Bubble {...props}
        textStyle={{
            right: {
                color: '#000000',
            },
            left: {
                color: '#000000',
            },
        }}
        timeTextStyle={{
            right: {
                color: '#000000',
            },
            left: {
                color: '#000000', 
            },
        }}
        wrapperStyle={{
            left: {
                backgroundColor:  '#F0F0F0',
            },
            right: {
                backgroundColor: '#ADD8E6',
            }
        }} />
     );
    }
    render() {
        return (
            
         
            <View style={{ flex: 1, marginTop: 90}}>
            <StatusBar barStyle="light-content" backgroundColor="#6f79a8" />
            <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.submitChatMessage(messages)}
            renderBubble={this.renderBubble}
            renderSend = {this.renderSend}
            user={{
                _id: this.props.userReducer.userAuth._id,
             }}
            placeholder='start typing...'
            //color='black'
            alwaysShowSend={true}
            scrollToBottom
            renderAvatar={this.renderAvatar}
            showAvatarForEveryMessage={true}
            showUserAvatar={true}
            isTyping={true}
            />
         </View>
        
        )
    }
}
function mapStateToProps(state) {
    return {
        chatReducer: state.chatReducer,
        userReducer: state.userReducer
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onChatMessage: (chatMessage) => dispatch(chatInsert(chatMessage)),
        onGetMessage: (data) => dispatch(chatList(data))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);
