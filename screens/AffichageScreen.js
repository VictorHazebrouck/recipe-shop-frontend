import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { modifyPlanning } from "../reducers/user";
import LargeButton from "../components/LargeButton";
import ROUTE from "../globals/nico";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function PlanningScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.credentials.token;
  const isLoggedIn = user.isLoggedIn;
  const planningChecked = user.preferences.planningChecked

  const [isPlanningChecked, setPlanningChecked] = useState(planningChecked);


  const handlePlanningCheck = () => {
    setPlanningChecked(!isPlanningChecked);
  };

  const handleNext = async () => {
    const response = await fetch(`${ROUTE}/users/preference`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        planningDisplay: isPlanningChecked,
        token: token,
      }),
    });
    const data = await response.json();
    if (!data.result) return;
    dispatch(modifyPlanning(isPlanningChecked));
    if (isLoggedIn) {
      navigation.navigate("TabNavigator", { screen: "Parameters" });
    } else {
      navigation.navigate("FavStore");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ alignItems: "center" }}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}></View>
          <View style={styles.progress}></View>
        </View>
        <Text style={styles.h2}>AFFICHAGE</Text>

        <TouchableOpacity onPress={handlePlanningCheck}>
          <View
            style={[
              styles.checkboxContainer,
              {
                backgroundColor: isPlanningChecked ? "#EE9F68" : "transparent",
              },
            ]}
          >
            <Checkbox
              style={styles.checkbox}
              value={isPlanningChecked}
              onValueChange={handlePlanningCheck}
              color={isPlanningChecked ? "#4B3A47" : undefined}
            />
            <Text style={{ flex: 1 }}>
              Planifier les recettes dans un planning et avoir la liste de
              courses
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlanningCheck}>
          <View
            style={[
              styles.checkboxContainer,
              {
                backgroundColor: !isPlanningChecked ? "#EE9F68" : "transparent",
              },
            ]}
          >
            <Checkbox
              style={styles.checkbox}
              value={!isPlanningChecked}
              onValueChange={handlePlanningCheck}
              color={!isPlanningChecked ? "#4B3A47" : undefined}
            />
            <Text style={{ flex: 1 }}>
              Sélectionner uniquement les recettes et obtenir la liste de
              courses
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <LargeButton onPress={handleNext} name="suivant" isPlain={true} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 40,
    backgroundColor: "#F9F8F8",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressContainer: {
    position: "relative",
    width: 300,
    height: 14,
    marginBottom: 24,
  },
  progressBar: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#C9AFBD",
    width: 300,
    height: 14,
  },
  progress: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#4B3B47",
    width: 225,
    height: 14,
  },
  h2: {
    fontFamily: "Anton-reg",
    fontSize: 40,
    color: "#4B3B47",
    alignSelf: "flex-start",
    marginBottom: 18,
    paddingHorizontal: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    width: screenWidth,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  checkbox: {
    marginRight: 10,
  },
});
