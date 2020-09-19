import React from 'react';
import {View,Text, StyleSheet, Platform} from 'react-native';
import  Colors  from '../constants/color';
import TitleText from './titleText';


const Header=(props)=>{
    return(
        <View style={styles.header}>
            <TitleText>{props.title}</TitleText>
        </View>
    )
};

const styles=StyleSheet.create({
    header:{
        width:'100%',
        height:90,
        paddingTop:36,
        backgroundColor:Platform.OS==="android"?Colors.primary:"white",
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:Platform.OS==="android"?"#ccc":'transparent',
        borderBottomWidth: Platform.OS==="android"?1:0
    },

});

export default Header;
