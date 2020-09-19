import React, { useState, useRef, useEffect } from 'react';
import { View, Button, StyleSheet, Text, Alert, Dimensions, FlatList } from 'react-native';
import NumberContainer from '../components/numberContainer';
import Card from '../components/card';
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/mainButton';
import { Ionicons } from '@expo/vector-icons'
import BodyText from "../components/bodyText";
import * as ScreenOrientation  from "expo-screen-orientation"

const genNumber = (max, min, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        genNumber(max, min, exclude);
    } else {
        return rndNum
    }
}

const renderList = (listLength, itemData) => {
    return <View key={itemData} style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
}

const GameScreen = props => {
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    const initialGuess = genNumber(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const { userChoice, onGameOver } = props
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
    const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);

    const nextGuess = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'You know its wrong...',
                [{ text: 'Sorry!', style: 'cancel' }])
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess + 1
        }

        const nextNum = genNumber(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNum);
        setPastGuesses(currentGuesses => [nextNum.toString(), ...currentGuesses]);
        if (isNaN(currentGuess)) {
            setCurrentGuess(userChoice)
        }
    }
    let listContainer = styles.listContainer;
    if (deviceWidth < 350) {
        listContainer = styles.bigListContainer;
    }
    useEffect(() => {
        const updateLayout = () => {
            setDeviceHeight(Dimensions.get('window').height);
            setDeviceWidth(Dimensions.get('window').width);
        }

        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    })

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver])

    if (deviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Opponent's Guess</Text>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuess.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    {/* <Card style={styles.btnContainer}> */}

                    <MainButton onPress={nextGuess.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color="white" />
                    </MainButton>
                </View>
                {/* </Card> */}
                <View style={listContainer}>
                    {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess,index) => renderList(guess,pastGuesses.length-index))}
                </ScrollView> */}
                    <FlatList keyExtractor={item => item} data={pastGuesses}
                        renderItem={renderList.bind(this, pastGuesses.length)}
                        contentContainerStyle={styles.list} />
                </View>

            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.btnContainer}>
                <MainButton onPress={nextGuess.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuess.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess,index) => renderList(guess,pastGuesses.length-index))}
            </ScrollView> */}
                <FlatList keyExtractor={item => item} data={pastGuesses}
                    renderItem={renderList.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list} />
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: 400,
        maxWidth: '90%'
    },
    listItem: {
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    list: {
        flexGrow: 1,
        // alignItems:'center',
        justifyContent: 'flex-end'
    },
    listContainer: {
        flex: 1,
        // width: Dimensions.get('window').width > 350 ? '60%' : '80%'
        width: '60%'
    },
    bigListContainer: {
        flex: 1,
        width: '80%'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    }
});

export default GameScreen;