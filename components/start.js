import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, ImageBackground, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

//Creating constant variables for assets including the icon used in the inputBox and the background image 
const image = require('../assets/BackgroundImage.png');
const icon = require('../assets/personIcon.svg')

//Setting the initial state of name to blank and bgColor to be purple
export default class StartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            bgColor: this.colors.purple,
        }
    }
    //Function to change the background color to the color selected
    changeBgColor = (newColor) => {
        this.setState({ bgColor: newColor })
    };
    //Declaring an array of colors
    colors = {
        black: '#090C08',
        purple: '#474056',
        blue: '#8A95A5',
        green: '#B9C6AE',
    };

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                    <View>
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
                                style={styles.color4}
                                onPress={() => this.changeBgColor(this.colors.green)}>
                            </TouchableOpacity>
                        </View>

                        <Pressable //This is the React Native component for a pressable element. 
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

//Declaring style sheet

const styles = StyleSheet.create({
    container: {
        flex: 1, //Keeping it at 1 and a column makes the container for the entire space. 
        flexDirection: "column", //This establishes the direction for the container. 
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
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
        padding: 20,
    },
})