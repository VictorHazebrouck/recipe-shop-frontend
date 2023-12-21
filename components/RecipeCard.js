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
import { useDispatch, useSelector } from "react-redux";
import { removeFavoriteRecipes, addFavoriteRecipes } from "../reducers/user";

const RecipeCard = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.credentials.token

  const handleLike = () => {
    fetch(`${ROUTE}/users/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipe: { _id: props._id }, token: token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(addFavoriteRecipes({ _id: props._id }));
          //setLike("heart");
        } else {
          dispatch(removeFavoriteRecipes({ _id: props._id }));
          //setLike("heart-o");
        }
      });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.handlePressCard(props)}
    >
      <Image source={{ uri: props.imageURL }} style={{ flex: 1 }} />
      <View style={styles.infosContainer}>
        <Text style={styles.text}>{props.name}</Text>
        <TouchableOpacity style={{width: 25, height: 25, alignItems: "center", justifyContent: "center"}} onPress={handleLike}>
          <FontAwesome
            name={
              user.personalRecipes.favoriteRecipes.some(
                (e) => e._id === props._id
              )
                ? "heart"
                : "heart-o"
            }
            size={20}
            color="#CC3F0C"
          />
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
