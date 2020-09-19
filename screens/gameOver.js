import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';
import BodyText from '../components/bodyText'
import TitleText from '../components/titleText'
import Colors from '../constants/color'
import MainButton from "../components/mainButton"

const GameOver = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The Game is over!</TitleText>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/success.png')}
                        // source={{ uri: 'https://s3.amazonaws.com/images.gearjunkie.com/uploads/2018/05/matterhorn-3x2.jpg' }}
                        style={styles.img}
                        fadeDuration={1000}

                    /></View>
                <BodyText style={styles.resultText}>Number of Rounds taken:
            <Text style={styles.highlghts}>{props.roundNumber}</Text> and the
            Number was:
            <Text style={styles.highlghts}>{props.userNumber}</Text>
                </BodyText>

                <MainButton onPress={props.onRestart} >NEW GAME</MainButton>
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    img: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        // aspectRatio: 
        // resizeMode:'stretch'
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.35,
        overflow: "hidden",
        borderColor: 'black',
        borderWidth: 2,
        marginVertical: Dimensions.get('window').height / 30
    },
    highlghts: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
        textAlign: 'center'
    },
    resultText: {
        marginVertical: Dimensions.get('window').height / 60,
        fontSize: Dimensions.get('window').height > 400 ? 20 : 16
    }
});

export default GameOver;