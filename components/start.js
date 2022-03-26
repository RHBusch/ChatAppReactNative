import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, ImageBackground } from 'react-native';

//Assets 

const image = require('../assets/BackgroundImage.png');

export default class StartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '' }
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image} />
                <TextInput
                    onChangeText={(text) => this.setState({ name: text })}
                    value={this.state.name}
                    placeholder='Type Your Name Here!'
                />
                <Button
                    title="Go to Screen 2"
                    onPress={() => this.props.navigation.navigate('ChatScreen')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
})