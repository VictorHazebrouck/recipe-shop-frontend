import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import SmallButton from "../components/SmallButton";
import StoreCard from "../components/StoreCard";
import { useDispatch, useSelector } from "react-redux";

export default function FavStoreScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLoggedIn = user.isLoggedIn;

  const [postCode, setPostCode] = useState('');

  const handlePostCode = () => {
    if (postCode.length === 0) {
      return;
    }

    fetch(`https://api-adresse.data.gouv.fr/search/?q=${postcode}`)
      .then((response) => response.json())
      .then((data) => {
        const firstPostCode = data.features[0];
        const newPostCode = {
          postCode: firstPostCode.properties.postCode,
          latitude: firstPostCode.geometry.coordinates[1],
          longitude: firstPostCode.geometry.coordinates[0],
        };

        dispatch(addPostCode(newPostCode));
        setPostCode('');
      });
  };

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
        placeholder="Code postal"
        onChangeText={(value) => setPostCode(value)}
        value={postCode}
      />

      <StoreCard uri="https://res.cloudinary.com/dyflh81v9/image/upload/v1703066301/Leclerc_n5a1ax.png" name="E.Leclerc Carvin" distance ={4.2}/>

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