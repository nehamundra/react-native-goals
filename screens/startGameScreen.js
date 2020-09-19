import React, { useState, useEffect } from 'react';
import {
    View, Text, Button, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert,
    Dimensions, ScrollView, KeyboardAvoidingView
} from 'react-native';
import Card from '../components/card'
import Colors from '../constants/color';
import Input from '../components/input';
import NumberContainer from '../components/numberContainer';
import BodyText from '../components/bodyText'
import TitleText from '../components/titleText'
import MainButton from '../components/mainButton'

const StartGameScreen = props => {
    const [numVal, setNumVal] = useState('');
    const [confirm, setConfrim] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);


    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4)
        }

        Dimensions.addEventListener('change', updateLayout)
        return()=>{
            Dimensions.removeEventListener('change',updateLayout)
        }
    })
    const numInputHandler = inputText => {
        setNumVal(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setNumVal('');
        setConfrim(false);
    }

    const confirmInputHandler = () => {
        const chosenNumer = parseInt(numVal);
        if (isNaN(chosenNumer) || chosenNumer <= 0 || chosenNumer > 99) {
            Alert.alert('Invalid Number',
                'Number has to be between 1 and 99',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
            return;
        }
        setConfrim(true);
        setSelectedNumber(parseInt(chosenNumer));
        setNumVal('');
        Keyboard.dismiss();

    }

    let confirmedOutput;

    if (confirm) {
        confirmedOutput = <Card style={styles.summaryContainer}>
            <Text>You selected</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                START GAMEs
            </MainButton>
        </Card>
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={styles.screen}>
                        <BodyText>The Game Screen!</BodyText>
                        <Card style={styles.inputContainer}>
                            <TitleText style={styles.text}>Select a Number</TitleText>
                            <Input style={styles.textInput} blurOnSubmit autoCaptilize='none'
                                autoCorrect={false} keyboardType="number-pad" maxLength={2}
                                onChangeText={numInputHandler} value={numVal} />
                            <View style={styles.btnContainer}>
                                <View style={{ width: buttonWidth }}>
                                    <Button title="Reset" onPress={resetInputHandler} color={Colors.accent} />
                                </View>
                                <View style={{ width: buttonWidth }}>
                                    <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        minWidth: 300,
        width: '80%',
        maxWidth: '95%',
        alignItems: 'center'
    },
    btnContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    // bttn: {
    //     width: Dimensions.get('window').width / 4
    // },

    textInput: {
        width: 50,
        textAlign: 'center'
    },

    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    text: {
        fontFamily: 'open-sans'
    }
});

export default StartGameScreen;

