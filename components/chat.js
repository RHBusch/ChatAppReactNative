import React from 'react';
import { View, Text, Button, TextInput, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { GiftedChat, Bubble, SystemMessage } from 'react-native-gifted-chat'

import firebase from "firebase/compat/app" //Importing firebase and firestore. This compatibility file seems to fix previous issues from earlier versions. 
import "firebase/compat/auth"
import "firebase/compat/firestore"


const firebaseConfig = { //These are the config keys needed to communicate with firebase.
    apiKey: "AIzaSyCtYAr6ZkNPg8li1_uoA-vfADIUU_4G7IA",
    authDomain: "chatapp-9f223.firebaseapp.com",
    projectId: "chatapp-9f223",
    storageBucket: "chatapp-9f223.appspot.com",
    messagingSenderId: "407593908179"
};


export default class ChatScreen extends React.Component {
    constructor(props) {
        super();
        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: "",
                name: "",
                avatar: "",
            }
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig); //Calling the config keys to initialize the app. 
        }
        this.referenceMessages = firebase.firestore().collection('messages');
    }

    //Using componentDidMount to follow the ChatScreen component mounting to set state, etc.
    componentDidMount() {
        let { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => { //User authentication.
            if (!user) {
                firebase.auth().signInAnonymously();
            }
            this.setState({
                uid: user.uid,
                messages: [],
                user: {
                    _id: user.uid,
                    name: name,
                    avatar: 'https://placeimg.com/140/140/any',
                }
            });
            this.unsubscribe = this.referenceMessages
                .orderBy("createdAt", "desc")
                .onSnapshot(this.onCollectionUpdate);
        });
    }

    componentWillUnmount() { //Stop listening to authentication and collection changes
        this.authUnsubscribe();
        this.unsubscribe();
    }

    addMessages() { // This is a function to add messages to firebase. referenceMessages is declared in the constructor.
        const message = this.state.messages[0];
        this.referenceMessages.add({
            _id: message._id,
            text: message.text || '',
            createdAt: message.createdAt,
            user: this.state.user
        })
    }

    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // go through each document
        querySnapshot.forEach((doc) => {
            // get the QueryDocumentSnapshot's data
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar,
                }
            });
            this.setState({
                messages: messages
            });
        })
    };

    /*In the code below, the function setState() is called with the parameter previousState, 
    which is a reference to the component’s state at the time the change is applied. 
    Then comes the append() function provided by GiftedChat, which appends the new message to the messages object. 
    
    The message a user has just sent gets appended to the state messages so 
    that it can be displayed in the chat. */

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }),
            () => { this.addMessages() }
        )
    }

    //Editing the chat bubble color here. 
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: 'blue'
                    }
                }}
            />
        )
    }
    //Editing the system message font style here
    renderSystemMessage(props) {
        const { bgColor } = this.props.route.params;
        return (
            <SystemMessage
                {...props}
                textStyle={{ color: 'white', fontSize: 16, fontWeight: '600' }}
            />
        )
    }

    render() {
        let name = this.props.route.params.name; // pulling directly from the navigate function and the button on start.js line 104
        this.props.navigation.setOptions({ title: name });
        const { bgColor } = this.props.route.params;
        return (
            <View
                style={{ flex: 1, justifyContent: 'center', backgroundColor: bgColor }}>
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)} //calling the bubble style function above
                    renderSystemMessage={this.renderSystemMessage.bind(this)} // calling the system style function above
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: this.state.user._id,
                        name: this.state.name,
                        avatar: this.state.user.avatar
                    }}
                />
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View> // The KeyboardAvoidingView fixes a common error encountered in Android testing where the keyboard covers the chat section.
        )
    }
}
