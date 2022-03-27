import React from 'react';
import { View, Text, Button, TextInput, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { GiftedChat, Bubble, SystemMessage } from 'react-native-gifted-chat'

export default class ChatScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
        }
    }

    //Using componentDidMount to follow the ChatScreen component mounting to set state, etc.
    componentDidMount() {
        const name = this.props.route.params.name;
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer', //This is the initial message
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any'
                    },
                },
                {
                    _id: 2,
                    text: name + ' is now in the chat room!', //This is the system message. 
                    createdAt: new Date(),
                    system: true,
                    fontColor: '#000'
                }
            ],
        })
    }

    /*In the code below, the function setState() is called with the parameter previousState, 
    which is a reference to the component’s state at the time the change is applied. 
    Then comes the append() function provided by GiftedChat, which appends the new message to the messages object. 
    
    The message a user has just sent gets appended to the state messages so 
    that it can be displayed in the chat. */

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }))
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
        let name = this.props.route.params.name;
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
                        _id: 1,
                    }}
                />
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View> // The KeyboardAvoidingView fixes a common error encountered in Android testing where the keyboard covers the chat section.
        )
    }
}
