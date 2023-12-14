import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState, useEffect } from "react";
import ROUTE from "../globals/nico";
import MyButton from "../components/MyButton";

export default function ShopScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [recipesToDelete, setRecipesToDelete] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${ROUTE}/recipes`);
      const data = await response.json();
      setRecipes(data.res);
    })();
  }, []);

  const handleDeleteRecipe = (recipeName) => {
    // Ajout de la recette à la liste des recettes à supprimer
    setRecipesToDelete([...recipesToDelete, recipeName]);
  };

  const recipesList = recipes.map((e, i) => {
    // Vérifie si la recette doit être supprimée visuellement
    const shouldDelete = recipesToDelete.includes(e.name);

    return (
      !shouldDelete && (
        <View key={i} style={styles.ingredientContainer}>
          <Text style={styles.name}>{e.name}</Text>
          <TouchableOpacity onPress={() => handleDeleteRecipe(e.name)}>
            <FontAwesome
              style={{ marginLeft: 10 }}
              name="trash-o"
              size={25}
              color="#CC3F0C"
            />
          </TouchableOpacity>
        </View>
      )
    );
  });

  return (
    <View style={styles.container}>
      <Text>shop Screen</Text>
      <View style={styles.ingredientList}>{recipesList}</View>
      <MyButton
        name="valider"
        onPress={() => navigation.navigate("TabNavigator")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ingredientList: {
    backgroundColor: "lightgreen",
    padding: 20,
  },
  ingredientContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#937B8A",
    marginBottom: 20,
  },
  name: { fontSize: 16, fontWeight: "600" },
});
