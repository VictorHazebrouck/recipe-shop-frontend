import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import SmallButton from "../components/SmallButton";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../reducers/user";

export default function FavStoreScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.credentials.token;
  const isLoggedIn = user.isLoggedIn;

  const [location, setLocation] = useState("Votre code postal"); 

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
          marginTop: 50,
          marginLeft: 30,
        }}
      >
        Les magasins proches de :
      </Text>
      <TextInput
        style={styles.input}
        placeholder={location}
        onChangeText={(text) => setLocation(text)}
      />
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
    paddingTop: 20,
    backgroundColor: "#EAEAEA",
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 30,
    textAlign: "left",
    paddingStart: 10,

  },
  button: {
    marginTop: "auto",
    width: 200,
    marginBottom: 50,
  },
});