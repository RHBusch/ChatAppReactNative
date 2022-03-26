import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, ImageBackground, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

//Assets 

const image = require('../assets/BackgroundImage.png');
const icon = require('../assets/personIcon.svg')

export default class StartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '' }
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                    <View
                        accessible={false}
                        accessibilityLabel="Chat App"
                        accessibilityHint="Chat App title"
                        accessibilityRole="header"
                        style={styles.titleBox}
                    >
                        <Text style={styles.title}>ChatApp</Text>
                    </View>
                    <View style={styles.loginBox}>
                        <View style={styles.inputBox}>
                            <Image source={icon} style={styles.userIcon} />
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => this.setState({ name: text })}
                                value={this.state.name}
                                placeholder='Type Your Name Here!'
                            />
                        </View>

                        <View style={styles.colorBox}>
                            <Text style={styles.colorText}> Choose Background Color:</Text>
                        </View>

                        <View style={styles.colorArray}>
                            <TouchableOpacity
                                style={styles.color1}
                                onPress={() => this.changeBgColor(this.colors.dark)}>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.color2}
                                onPress={() => this.changeBgColor(this.colors.purple)}>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.color3}
                                onPress={() => this.changeBgColor(this.colors.blue)}>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.color3}
                                onPress={() => this.changeBgColor(this.colors.green)}>
                            </TouchableOpacity>
                        </View>

                        <Pressable
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('ChatScreen', {
                                name: this.state.name,
                                bgColor: this.state.bgColor
                            })}>
                            <Text style={styles.buttonText}>Start Chatting!</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
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
    },
    userIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    loginBox: {
        marginBottom: 20,
        backgroundColor: 'white',
        flexGrow: 1,
        flexShrink: 0,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 15,
        height: 250,
        minHeight: 250,
        maxHeight: 300,
        height: '3%',
        width: '75%',
    },
    inputBox: {
        flexDirection: 'row',
        width: '88%',
        borderColor: '#757083',
        borderWidth: 1,
        padding: 10,
        color: '#757083',
        opacity: 0.5,
    },
    titleBox: {
        height: '50%',
        width: '95%',
        alignItems: 'center',
        paddingTop: 100
    },
    title: {
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
        padding: 20,
    },
    color1: {
        backgroundColor: '#090C08',
        width: 50,
        height: 50,
        borderRadius: 25
    },
    color2: {
        backgroundColor: '#474056',
        width: 50,
        height: 50,
        borderRadius: 25
    },
    color3: {
        backgroundColor: '#8A95A5',
        width: 50,
        height: 50,
        borderRadius: 25
    },
    color4: {
        backgroundColor: '#B9C6AE',
        width: 50,
        height: 50,
        borderRadius: 25
    },
    colorArray: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '88%',
        paddingRight: 60
    },
    button: {
        width: '88%',
        height: 70,
        backgroundColor: '#757083',
        alignItems: 'center',
        justifyContent: 'center'
    },
})