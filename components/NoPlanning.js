import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import ROUTE from "../globals/nico";
import { useSelector, useDispatch } from "react-redux";
import { modifyCurrentRecipe } from "../reducers/user";
import RecipeModal from "./RecipeModal";

const screenHeight = Dimensions.get("window").height;

export default function NoPlanningScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.credentials.token;

  const currentRecipes = user.plannedRecipes.currentRecipes;
  const historyRecipes = user.plannedRecipes.historyRecipes;
  const [isCurrentRecipes, setIsCurrentRecipes] = useState(true);

  const handleAddRecipe = () => {
    navigation.navigate("Home");
  };

  const handleDeleteRecipe = async (recipeId) => {
    // Filtrer les recettes pour supprimer celle avec le nom correspondant
    const response = await fetch(`${ROUTE}/users/currentRecipes`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId: recipeId, token: token }),
    });
    const data = await response.json();
    dispatch(modifyCurrentRecipe(data.response));
  };

  const currentRecipesList = (
    isCurrentRecipes ? currentRecipes : historyRecipes
  ).map((e, i) => {
    return (
      <View key={i} style={styles.recipesContainer}>
        <TouchableOpacity onPress={() => handleTextPress(e)}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#4B3B47" }}>
            {e.id.name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteRecipe(e._id)}>
          <FontAwesome name="trash" size={25} color="#4B3B47" />
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <TouchableOpacity
          onPress={() => setIsCurrentRecipes(!isCurrentRecipes)}
        >
          <Text style={isCurrentRecipes ? styles.h3 : styles.regular}>
            Mes envies
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsCurrentRecipes(!isCurrentRecipes)}
        >
          <Text style={isCurrentRecipes ? styles.regular : styles.h3}>
            Historique
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        vertical
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerResults}
      >
        {currentRecipesList}
      </ScrollView>
      <TouchableOpacity style={styles.addRecipe} onPress={handleAddRecipe}>
        <Text style={{ fontSize: 16, color: "#ffffff" }}>
          Ajouter une recette
        </Text>
        <FontAwesome
          style={{ marginLeft: 10 }}
          name="plus"
          size={25}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F8F8",
  },
  h3: {
    fontSize: 30,
    color: "#4B3B47",
  },
  regular: {
    fontSize: 16,
    color: "#4B3B47",
  },
  containerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerResults: {
    marginVertical: 20,
    height: screenHeight - 200,
  },
  recipesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#4B3B47",
    borderRadius: 5,
  },
  addRecipe: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#CC3F0C",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
});
