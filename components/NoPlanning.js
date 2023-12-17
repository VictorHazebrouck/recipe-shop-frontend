import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import ROUTE from "../globals/nico";
import { useSelector, useDispatch } from "react-redux";
import { modifyCurrentRecipe } from "../reducers/user";
import RecipeModal from "./RecipeModal";

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

  console.log(user.plannedRecipes.currentRecipes);

  const handleDeleteRecipe = async (recipeId) => {
    // Filtrer les recettes pour supprimer celle avec le nom correspondant
    const response = await fetch(`${ROUTE}/users/currentRecipes`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId }),
    });
    const data = await response.json();
    dispatch(modifyCurrentRecipe(data.response));
  };

  const currentRecipesList = (
    isCurrentRecipes ? currentRecipes : historyRecipes
  ).map((e, i) => {
    return (
      <View key={i} style={styles.recipesContainer}>
        <View style={styles.recipesList}>
          <TouchableOpacity
            onPress={() => handleTextPress(e)}
            style={{ width: "80%" }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>{e.id.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteRecipe(e._id)}>
            <FontAwesome
              style={{ marginLeft: 10 }}
              name="trash-o"
              size={25}
              color="#CC3F0C"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <TouchableOpacity
          onPress={() => setIsCurrentRecipes(!isCurrentRecipes)}
        >
          <Text style={isCurrentRecipes ? styles.title : styles.text}>
            Mes envies
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsCurrentRecipes(!isCurrentRecipes)}
        >
          <Text style={isCurrentRecipes ? styles.text : styles.title}>
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

        <TouchableOpacity style={styles.addRecipe} onPress={handleAddRecipe}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#ffffff",
              width: "80%",
            }}
          >
            Ajouter une recette
          </Text>

          <FontAwesome
            style={{ marginLeft: 10 }}
            name="plus"
            size={25}
            color="#ffffff"
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: "#F9F8F8",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
  },
  containerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  containerResults: {
    height: 1000,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 15,
  },
  recipesContainer: {
    margin: "1%",
    flexDirection: "column-reverse",
  },
  recipesList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#937B8A",
    borderRadius: 5,
    marginLeft: 30,
  },
  addRecipe: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CC3F0C",
    marginTop: 30,
    marginLeft: 40,
    width: "80%",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
