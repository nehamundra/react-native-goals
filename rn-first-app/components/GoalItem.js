import React from 'react';
import { View, Text, StyleSheet, 
    TouchableOpacity, TouchableHighlight,TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';

const GoalItem = props => {
    return <TouchableOpacity activeOpacity={0.2} onPress={props.onDelete}>
        <View style={styles.listItem} >
            <Text>{props.title}</Text>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        backgroundColor: '#ccc',
        borderColor: 'black',
        borderWidth: 1,
        marginVertical: 10
    }
})

export default GoalItem