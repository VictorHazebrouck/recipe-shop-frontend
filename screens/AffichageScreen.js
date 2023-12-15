import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useDispatch } from 'react-redux';
import {choicePlanning} from '../reducers/user';
import MyButton from '../components/MyButton';


export default function PlanningScreen({ navigation }) {
  const [isPlanningChecked, setPlanningChecked] = useState(true);
  const dispatch = useDispatch();

  const handlePlanningCheck = () => {
    setPlanningChecked(!isPlanningChecked);
  
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.title}>AFFICHAGE</Text>
      </View>
      <TouchableOpacity onPress={handlePlanningCheck}>
        <View
          style={[
            styles.checkboxContainer,
            { backgroundColor: isPlanningChecked ? "#EE9F68" : "transparent" },
          ]}
        >
          <Checkbox
            style={styles.checkbox}
            value={isPlanningChecked}
            onValueChange={handlePlanningCheck}
            color={isPlanningChecked ? "#4B3A47" : undefined}
          />
          <Text>
            Planifier les recettes dans un planning et avoir la liste de courses
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePlanningCheck}>
        <View style={[styles.checkboxContainer, { backgroundColor: !isPlanningChecked ? '#EE9F68' : 'transparent' }]}>
          <Checkbox
            style={styles.checkbox}
            value={!isPlanningChecked}
            onValueChange={handlePlanningCheck}
            color={!isPlanningChecked ? '#4B3A47' : undefined}
          />
          <Text>
            Sélectionner uniquement les recettes et obtenir la liste de courses
          </Text>
        </View>
      </TouchableOpacity>
      <MyButton onPress={() => navigation.navigate("FavStore")} name="suivant" isPlain={true} styleButton={styles.button}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  containerTop: {
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    paddingVertical: 40,
    paddingHorizontal: 50,
  },
  checkbox: {
    marginRight: 10,
  },
  Next: {
    backgroundColor: "#CC3F0C",
    paddingHorizontal: 70,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  button:{
    marginTop: "auto",
    width: 200,
    marginBottom: 50,
  },
});
