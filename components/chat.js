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
    componentDidMount() {
        const name = this.props.route.params.name;
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any'
                    },
                },
                {
                    _id: 2,
                    text: name + ' is now in the chat room!',
                    createdAt: new Date(),
                    system: true,
                    fontColor: '#000'
                }
            ],
        })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }))
    }

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
                    renderBubble={this.renderBubble.bind(this)}
                    renderSystemMessage={this.renderSystemMessage.bind(this)}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>
        )
    }
}
