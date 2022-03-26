import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';

export default class StartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '' }
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    TEST HERE TEST Again
                </Text>
                <Button
                    title="Go to Screen 2"
                    onPress={() => this.props.navigation.navigate('ChatScreen')}
                />
            </View>
        )
    }
}

/*const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        fontSize: 16,
        fontWeight: 300,
        fontColor: '#757083',
        opacity: 0.5,
    }
})*/