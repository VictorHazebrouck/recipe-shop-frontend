import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import LargeButton from "../components/LargeButton";
import StoreCard from "../components/StoreCard";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const screenWidth = Dimensions.get("window").width;

export default function FavStoreScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.credentials.token;
  const isLoggedIn = user.isLoggedIn;

  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        Location.watchPositionAsync(
          { distanceInterval: 10 },
          async (location) => {
            const { coords } = location;

            const response = await fetch(
              `https://api-adresse.data.gouv.fr/reverse/?lon=${coords.longitude}&lat=${coords.latitude}`
            );
            const data = await response.json();

            if (data.features && data.features.length > 0) {
              const newPostalCode = data.features[0].properties.postcode;
              setPostalCode(newPostalCode);
            } else {
              console.log("Aucune adresse trouvée.");
            }
          }
        );
      }
    })();
  }, []);

  const handleNext = () => {
    if (isLoggedIn) {
      navigation.navigate("TabNavigator", { screen: "Parameters" });
    } else {
      navigation.navigate("TabNavigator");
      dispatch(setLogin());
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ alignItems: "center", backgroundColor: "red" }}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}></View>
          <View style={styles.progress}></View>
        </View>
        <Text style={styles.h2}>REGIME</Text>
        <Text style={styles.subTitle}>Les magasins proches de</Text>
        <View style={styles.content}></View>

        <FontAwesome
          style={{ position: "absolute" }}
          name="map-marker"
          size={25}
          color="#333"
        />
        <TextInput
          placeholder="Code postal"
          onChangeText={(value) => setPostalCode(value)}
          value={postalCode}
          style={styles.input}
        />

        <StoreCard />
      </View>
      <LargeButton onPress={handleNext} name="suivant" isPlain={true} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#EAEAEA",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: screenWidth - 40,
    height: 40,
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 30,
    textAlign: "left",
    paddingStart: 10,
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
    width: 300,
    height: 14,
  },
  h2: {
    fontFamily: "Ops-reg",
    fontSize: 40,
    color: "#4B3B47",
    alignSelf: "flex-start",
    marginBottom: 18,
  },
  subTitle: {
    fontSize: 16,
    color: "#4B3B47",
    alignSelf: "flex-start",
    marginBottom: 18,
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: screenWidth - 40,
  },
});
