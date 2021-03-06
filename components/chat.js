import React from 'react';
import { View, Text, Button, TextInput, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { GiftedChat, Bubble, SystemMessage, InputToolbar } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import MapView from 'react-native-maps';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/storage';

import CustomActions from './CustomActions'


const firebaseConfig = { //These are the config keys needed to communicate with firebase.
    apiKey: "AIzaSyCtYAr6ZkNPg8li1_uoA-vfADIUU_4G7IA",
    authDomain: "chatapp-9f223.firebaseapp.com",
    projectId: "chatapp-9f223",
    storageBucket: "gs://chatapp-9f223",
    messagingSenderId: "407593908179",
    messagingSenderId: "407593908179",
    appId: "1:407593908179:web:6c86f7e3aec2e240dda126"
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
            },
            isConnected: false,
            image: null,
            location: null,
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig); //Calling the config keys to initialize the app. 
        }
        this.referenceMessages = firebase.firestore().collection('messages');
    }

    async getMessages() {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    async saveMessages() {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages))
        } catch (error) {
            console.log(error.message);
        }
    }

    async deleteMessages() {
        try {
            await AsyncStorage.removeItem('messages');
            this.setState({ messages: [] })
        } catch (error) {
            console.log(error.message)
        }
    }

    //Using componentDidMount to follow the ChatScreen component mounting to set state, etc.
    componentDidMount() {
        let { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });

        NetInfo.fetch().then(connection => {
            if (connection.isConnected) {
                console.log('online');
                this.setState({ isConnected: true })
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
            } else {
                console.log('offline');
                this.getMessages();
                this.setState({ isConnected: false })
            }
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
            user: this.state.user,
            image: message.image || "",
            location: message.location || null,
        });
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
                },
                image: data.image || null,
                location: data.location || null,
            });
            this.setState({
                messages: messages
            });
        })
    };

    /*In the code below, the function setState() is called with the parameter previousState, 
    which is a reference to the component???s state at the time the change is applied. 
    Then comes the append() function provided by GiftedChat, which appends the new message to the messages object. 
    
    The message a user has just sent gets appended to the state messages so 
    that it can be displayed in the chat. */

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }),
            () => {
                this.addMessages();
                this.saveMessages()
            }
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

    renderInputToolbar(props) {
        if (this.state.isConnected == false) {
        } else {
            return (
                <InputToolbar
                    {...props}
                />
            );
        }
    }
    renderCustomActions = (props) => <CustomActions {...props} />;

    renderCustomView(props) {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            )
        }
        return null;
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
                    renderInputToolbar={this.renderInputToolbar.bind(this)} //calling the renderInputToolbar function above
                    renderCustomView={this.renderCustomView}
                    renderActions={this.renderCustomActions}
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
