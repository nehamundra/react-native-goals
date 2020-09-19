import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/header';
import StartGameScreen from './screens/startGameScreen';
import GameScreen from './screens/gameScreen';
import GameOver from './screens/gameOver'
import * as Font from'expo-font';
import {AppLoading} from'expo';

const fetchFonts=()=>{
  Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [userNumber,setUserNumber]=useState();
  const [guessRounds,setGuessRounds]=useState(0);
  const [dataLoaded, setDataLoaded]=useState(false);

  if(!dataLoaded){
    return <AppLoading startAsync={fetchFonts} 
    onFinish={()=>setDataLoaded(true)} onError={err=>console.log(err)}/>
  }

  const configureNewGame=()=>{
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGame=(selectedNumber)=>{
    setUserNumber(selectedNumber);
    setGuessRounds(0)
  }

  const gameOverHandler=numOfRounds=>{
    setGuessRounds(numOfRounds);
  }

  let content=<StartGameScreen onStartGame={startGame}/>;
  
  if(userNumber && guessRounds<=0){
    content=<GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
  }
  else if(guessRounds>0){
    content = <GameOver roundNumber={guessRounds} userNumber={userNumber} 
    onRestart={configureNewGame}/>
  }
  return (
    <View style={styles.screen}>
      <Header title="Guess a Number"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1
  }
});
