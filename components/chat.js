import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';


export default class ChatScreen extends React.Component {
    render() {
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });
        const { bgColor } = this.props.route.params;
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: bgColor
            }}>
                <Text> TESTING CHAT</Text>
            </View>
        )
    }
}