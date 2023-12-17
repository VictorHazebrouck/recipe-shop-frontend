import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { modifyPlanning } from "../reducers/user";
import ROUTE from "../globals/nico";
import SmallButton from "../components/SmallButton";

export default function PlanningScreen({ navigation }) {
  const user = useSelector((state)=> state.user)
  const token = user.credentials.token

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const planningChecked = useSelector((state) => state.user.preferences.planningChecked)
  const [isPlanningChecked, setPlanningChecked] = useState(planningChecked);
  const dispatch = useDispatch();

  const handlePlanningCheck = () => {
    setPlanningChecked(!isPlanningChecked);
  };

  const handleNext = async () => {
    const response = await fetch(`${ROUTE}/users/preference`,{
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({planningDisplay: isPlanningChecked, token: token})
    })
    const data = await response.json()
    if(!data.result) return
    dispatch(modifyPlanning(isPlanningChecked));
    if (isLoggedIn) {
      navigation.navigate("TabNavigator", { screen: "Parameters" });
    } else {
      navigation.navigate("FavStore");
    }
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
        <View
          style={[
            styles.checkboxContainer,
            { backgroundColor: !isPlanningChecked ? "#EE9F68" : "transparent" },
          ]}
        >
          <Checkbox
            style={styles.checkbox}
            value={!isPlanningChecked}
            onValueChange={handlePlanningCheck}
            color={!isPlanningChecked ? "#4B3A47" : undefined}
          />
          <Text>
            Sélectionner uniquement les recettes et obtenir la liste de courses
          </Text>
        </View>
      </TouchableOpacity>
      <SmallButton
        onPress={handleNext}
        name="suivant"
        isPlain={true}
        styleButton={styles.button}
      />
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
  button: {
    marginTop: "auto",
    width: 200,
    marginBottom: 50,
  },
});
