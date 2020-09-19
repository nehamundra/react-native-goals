import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput'

export default function App() {


  const [goals, setGoals] = useState([]);
  const [isAddMode, showAddMode] =useState(false);


  const addGoal = (enteredGoal) => {
    setGoals(currentgoal => [...currentgoal, { id: Math.random().toString(), value: enteredGoal }]);
    showAddMode(false);
  }

  const removeGoal = (goalId) => {
    setGoals(currentgoals => {
      return currentgoals.filter(goal => goal.id !== goalId);
    })
  }

  const cancelGoal=()=>{
    showAddMode(false);
  }

  return (
    <View style={styles.screen}>
      {/* <View style={styles.row}>
        <TextInput placeholder="Course Goal" 
        style={styles.textbcol} 
        value={enteredGoal}
        onChangeText={goalInput}/>

        <Button title="ADD" onPress={addGoal}/>
      </View> */}
      <Button title="Add New Goal" onPress={()=>showAddMode(true)} />
      <GoalInput onAdd={addGoal} show={isAddMode} cancelGoal={cancelGoal}/>

      <FlatList data={goals}
        keyExtractor={(item, index) => item.id}
        renderItem={itemData => (

          <GoalItem id={itemData.item.id}
            onDelete={removeGoal.bind(this, itemData.item.id)} 
            title={itemData.item.value} />
        )} />

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 40
  }



});



