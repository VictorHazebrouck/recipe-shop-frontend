import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState, useEffect } from "react";
import SmallButton from "../components/SmallButton";
import Ingredient from "../components/Ingredient";
import { useSelector } from "react-redux";
import ROUTE from "../globals/nico";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function ShopScreen({ navigation }) {
  const [ingredients, setIngredients] = useState([]);
  const [finished, setFinished] = useState(false);
  const user = useSelector((state) => state.user);
  const token = user.credentials.token;

  const currentRecipes = user.plannedRecipes.currentRecipes;

  useEffect(() => {
    (async () => {
      const ingredientsData = currentRecipes.flatMap((recipe) => {
        return recipe.id.ingredients.map((ingredient) => {
          return {
            qtyForRecipe: recipe.nb * ingredient.amount,
            name: ingredient.id.name,
            unit: ingredient.id.unit,
          };
        });
      });
      // regroup same ingredients and accumule qtyForRecipe
      const groupedIngredients = ingredientsData.reduce(
        (result, ingredient) => {
          const existingIngredient = result.findIndex(
            (item) => item.name === ingredient.name
          );
          if (existingIngredient >= 0) {
            result[existingIngredient].qtyForRecipe += ingredient.qtyForRecipe;
          } else {
            result.push({ ...ingredient });
          }
          return result;
        },
        []
      );

      setIngredients(groupedIngredients);
      if (ingredients) {
        setFinished(false);
      }
    })();
  }, [currentRecipes]);

  const handleDeleteIngredient = (name) => {
    setIngredients(ingredients.filter((e) => e.name !== name));
  };

  /**
   * @todo enlever les doublons, conputer les totaux, modifier etats sur les inputs.
   */
  const ingredientsList = ingredients.map((e, i) => (
    <Ingredient
      handleDeleteIngredient={handleDeleteIngredient}
      key={i}
      {...e}
    />
  ));

  // le filter est a aller fetch depuis la database des magasins
  const filter = [
    { name: "favoris", price: 65.23, distance: 4.2 },
    { name: "proche", price: 70.1, distance: 0.9 },
    { name: "livraison", price: 78.5, distance: "livraison" },
    { name: "economique", price: 35.46, distance: 4.2 },
  ];

  // filter store type rendering
  const filterList = filter.map((e, i) => {
    const iconComponent =
      e.name === "favoris" ? (
        <FontAwesome name={"star"} size={30} color="#fff" />
      ) : e.name === "proche" ? (
        <MaterialCommunityIcons
          name="map-marker-distance"
          size={30}
          color="#fff"
        />
      ) : e.name === "livraison" ? (
        <MaterialCommunityIcons
          name="truck-delivery-outline"
          size={30}
          color="#fff"
        />
      ) : e.name === "economique" ? (
        <FontAwesome name={"money"} size={30} color="#fff" />
      ) : null;

    return (
      <View key={i} style={styles.filterContainer}>
        <View style={styles.filterIcon}>{iconComponent}</View>
        <Text style={styles.filterPrice}>{e.price} €</Text>
        <Text style={styles.filterDistance}>{e.distance} km</Text>
      </View>
    );
  });

  const handleSubmit = async () => {
    const allRecipes = user.plannedRecipes.currentRecipes;
    console.log(allRecipes);
    allRecipes.map(async (e) => {
      console.log(e._id);
      const response = fetch(`${ROUTE}/users/archive`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token, recipeId: e._id }),
      });
      const data = await response.json();
      console.log(data);
    });
    // setFinished(true);
  };

  return (
    <View style={styles.container}>
      <Text>shop Screen</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        style={styles.filterList}
      >
        {filterList}
      </ScrollView>
      {finished && ingredients && ingredients.length > 0 ? (
        <View style={styles.emptyContent}>
          <Text style={styles.emptyText}>Vos courses sont terminées</Text>
        </View>
      ) : (
        <View style={styles.fullContent}>
          <ScrollView
            vertical={true}
            showsHorizontalScrollIndicator={true}
            style={styles.ingredientsList}
          >
            {ingredientsList}
          </ScrollView>
          <View
            style={{
              alignItems: "flex-end",
              width: screenWidth,
              paddingHorizontal: 20,
            }}
          >
            <SmallButton name="valider" onPress={handleSubmit} isPlain />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    alignItems: "center",
  },
  displayCenter: {
    height: screenHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  h2: {
    fontSize: 40,
    fontWeight: 600,
  },
  filterList: {
    backgroundColor: "#fff",
    width: screenWidth,
    paddingHorizontal: 20,
  },
  filterContainer: {
    width: 90,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  filterIcon: {
    backgroundColor: "#CC3F0C",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  filterPrice: {
    fontSize: 16,
    fontWeight: 600,
  },
  filterDistance: {
    fontSize: 16,
  },
  ingredientsList: {
    padding: 20,
    width: screenWidth,
    height: screenHeight - 240,
    marginVertical: 20,
  },
  fullContent: {
    width: screenWidth,
    height: screenHeight - 220,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContent: {
    width: screenWidth,
    height: screenHeight - 220,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 40,
    fontWeight: 600,
    color: "#4B3B47",
  },
});
