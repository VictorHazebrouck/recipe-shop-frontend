import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState, useEffect } from "react";
import ROUTE from "../globals/nico";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";

const RecipeCard = (props) => {
  // GET favorite recipes
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(`${ROUTE}/users/recipes`);
  //     const data = await response.json();
  //   })();
  // }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.handlePressCard(props)}
    >
      <Image source={{ uri: props.imageURL }} style={{ flex: 1 }} />
      <View style={styles.infosContainer}>
        <Text style={styles.text}>{props.name}</Text>
        <TouchableOpacity>
          <FontAwesome name={"heart-o"} size={20} color="#CC3F0C" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    height: (screenWidth * 58) / 100,
    width: (screenWidth * 48) / 100,
    backgroundColor: "white",
    margin: "1%",
    flexDirection: "column",
  },
  infosContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    height: "40%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },
  text: { fontSize: 16, fontWeight: "800", width: "72%" },
});

export default RecipeCard;
