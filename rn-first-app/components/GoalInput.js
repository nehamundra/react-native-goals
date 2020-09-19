import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';


const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('');
    const goalInput = (enteredText) => {
        setEnteredGoal(enteredText);
    }

    const addGoalHandler = () => {
        props.onAdd(enteredGoal);
        setEnteredGoal('');
    }
    return (
        <Modal visible={props.show} animationType="slide">
            <View style={styles.row}>
                <TextInput placeholder="Course Goal"
                    style={styles.textbcol}
                    value={enteredGoal}
                    onChangeText={goalInput} />
                <View style={styles.btnContainer}>
                    <View style={styles.btn}>
                    <Button title="CANCEL" color="red" onPress={props.cancelGoal} />
                    </View>
                    <View style={styles.btn}>
                    <Button title="ADD" onPress={addGoalHandler} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({

    row: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    textbcol: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        marginBottom: 10,
        width: '80%'
    },
    btnContainer: {
        flexDirection:'row',
        width:'60%',
        justifyContent:'space-around'
    },
    btn:{
      width:'40%'
    }
})

export default GoalInput