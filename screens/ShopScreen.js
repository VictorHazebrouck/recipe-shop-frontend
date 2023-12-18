import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState, useEffect } from "react";
import ROUTE from "../globals/nico";
import SmallButton from "../components/SmallButton";
import Ingredient from "../components/Ingredient";
import { useSelector } from "react-redux";

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
          if (existingIngredient > 0) {
            result[existingIngredient].qtyForRecipe += ingredient.qtyForRecipe;
          } else {
            result.push({ ...ingredient });
          }
          return result;
        },
        []
      );
      console.log("inside useEffect -->", groupedIngredients);

      setIngredients(groupedIngredients);
      //return () => setIngredients({});
    })();
  }, [currentRecipes]);

  /**
   * @todo enlever les doublons, conputer les totaux, modifier etats sur les inputs.
   */
  const ingredientsList =
    ingredients.length > 0 ? (
      ingredients.map((e, i) => <Ingredient key={i} {...e} />)
    ) : (
      <Text style={{ color: "red", fontSize: 16 }}>Votre liste est vide</Text>
    );

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

  const handleSubmit = () => {
    setFinished(true);
  };

  return finished ? (
    <View style={styles.container}>
      <View style={styles.displayCenter}>
        <Text style={styles.h2}>course terminé</Text>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <Text>shop Screen</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        style={styles.filterList}
      >
        {filterList}
      </ScrollView>
      <ScrollView
        vertical={true}
        showsHorizontalScrollIndicator={true}
        style={styles.ingredientsList}
      >
        {ingredientsList}
      </ScrollView>
      {ingredients && ingredients.length > 0 ? (
        <View
          style={{
            alignItems: "flex-end",
            width: screenWidth,
            paddingHorizontal: 20,
          }}
        >
          <SmallButton name="valider" onPress={handleSubmit} isPlain />
        </View>
      ) : null}
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
    height: screenHeight - 290,
    marginBottom: 20,
  },
});
