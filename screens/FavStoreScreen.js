import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import SmallButton from "../components/SmallButton";
import StoreCard from "../components/StoreCard";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function FavStoreScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLoggedIn = user.isLoggedIn;
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 }, async (location) => {
          const { coords } = location;

          const response = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${coords.longitude}&lat=${coords.latitude}`);
          const data = await response.json();

          if (data.features && data.features.length > 0) {
            const newPostalCode = data.features[0].properties.postcode;
            setPostalCode(newPostalCode);
          } else {
            console.log('Aucune adresse trouvée.');
          }
        });
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
    <View style={styles.container}>
        <View style={styles.progressContainer}>
        <View style={styles.progressBar}></View>
        <View style={styles.progress}></View>
      </View>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 30,
          marginLeft: 30,
        }}
      >
        MAGASIN FAVORI
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "thin",
          marginTop: 20,
          marginLeft: 30,
        }}
      >
        Les magasins proches de :
        
      </Text>

    <View style={{...styles.input, flexDirection: 'row', alignItems: 'center' }}>
    <FontAwesome
                style={{ marginLeft: 10, marginRight: 10, }}
                name="map-marker"
                size={25}
                color="#333"
              />
      <TextInput
        
        placeholder="Code postal"
        onChangeText={(value) => setPostalCode(value)}
        value={postalCode}
      />
    </View>

      <StoreCard/>

      <SmallButton
        onPress={handleNext}
        name="valider"
        isPlain={true}
        styleButton={styles.button}
      />
    </View>
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
    height: 40,
    width: "80%",
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
  button: {
    marginTop: "auto",
    width: 200,
    marginBottom: 50,
  },
});
