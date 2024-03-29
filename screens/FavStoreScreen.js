import React, { useState, useEffect } from "react";
import LargeButton from "../components/LargeButton";
import StoreCard from "../components/StoreCard";
import { useDispatch, useSelector } from "react-redux";
import { chooseFavoriteStore, setLogin, setPosition } from "../reducers/user";
import * as Location from "expo-location";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ROUTE from "../globals/nico";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function FavStoreScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.credentials.token;
  const isLoggedIn = user.isLoggedIn;
  const [postalCode, setPostalCode] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [stores, setStores] = useState(null);

  //get user location & retrieve related postcode with datagouv api from the user's lat/lon
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        Location.watchPositionAsync(
          { distanceInterval: 10 },
          async (location) => {
            const { coords } = location;
            setLatitude(coords.latitude);
            setLongitude(coords.longitude);

            const response = await fetch(
              `https://api-adresse.data.gouv.fr/reverse/?lon=${coords.longitude}&lat=${coords.latitude}`
            );
            const data = await response.json();

            if (data.features && data.features.length > 0) {
              const newPostalCode = data.features[0].properties.postcode;
              dispatch(setPosition({lat: coords.latitude, lon: coords.longitude}))
              setPostalCode(newPostalCode);
            } else {
              console.log("Aucune adresse trouvée.");
            }
          }
        );
      }
    })();
  }, []);

  //retrives stores data from db and saves it in stores state
  useEffect(() => {
    (async () => {
      const response = await fetch(`${ROUTE}/stores/lowestPrices`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredientsList: [],
        }),
      });
      const data = await response.json();
      setStores(data.response);
    })();
  }, []);

  //saves users fav store in db and reducer
  const handleFavStore = async (storeid) => {
    const response = await fetch(`${ROUTE}/users/preference`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        favStore: storeid,
        token: token,
      }),
    });
    const data = await response.json();
    if (!data.result) return;
    dispatch(chooseFavoriteStore(data.response.favStore));
  };

  //Displays list of stores
  let storeList = [];
  stores &&
    (storeList = stores.map((e, i) => {
      return (
        <StoreCard
          key={i}
          {...e.store}
          latitude={latitude}
          longitude={longitude}
          handleFavStore={handleFavStore}
        />
      );
    }));

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
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}></View>
            <View style={styles.progress}></View>
          </View>
          <Text style={styles.h2}>Magasin favori</Text>
          <Text style={styles.subTitle}>Les magasins proches de</Text>
          <View style={styles.storeList}>
            <FontAwesome
              style={{ position: "absolute", top: 5, right: 10 }}
              name="map-marker"
              size={25}
              color="#937B8A"
            />
            <TextInput
              placeholder="Code postal"
              onChangeText={(value) => setPostalCode(value)}
              value={postalCode}
              style={styles.input}
              keyboardType="numeric"
            />
            <ScrollView vertical={true} showsHorizontalScrollIndicator={true}>
              <View style={styles.ScrollView}>{storeList}</View>
            </ScrollView>
          </View>
        </View>
        <LargeButton onPress={handleNext} name="suivant" isPlain={true} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: "#F9F8F8",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: screenWidth - 40,
    height: 42,
    borderColor: "#937B8A",
    color: "#937B8A",
    borderRadius: 5,
    borderWidth: 1,
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
    fontFamily: "Anton-reg",
    fontSize: 40,
    color: "#4B3B47",
    alignSelf: "flex-start",
    marginBottom: 18,
  },
  subTitle: {
    fontSize: 16,
    color: "#4B3B47",
    alignSelf: "flex-start",
  },
  storeList: {
    height: screenHeight - 300,
    marginTop: 20,
  },
  ScrollView: {
    height: screenHeight - 300,
    marginVertical: 20,
    flex: 1,
  },
});
