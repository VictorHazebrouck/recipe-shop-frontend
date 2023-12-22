import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import SmallButton from "../components/SmallButton";
import Ingredient from "../components/Ingredient";
import { useDispatch, useSelector } from "react-redux";
import { modifyCurrentRecipe, modifyHistory } from "../reducers/user";
import ROUTE from "../globals/nico";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

//result of Nico's mathematical genius
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance;
};

export default function ShopScreen({ navigation }) {
  const [ref, setRef] = useState(0);
  const [ingredientsAndStore, setIngredientsAndStore] = useState({
    ingredients: [],
    stores: [],
  });

  const user = useSelector((state) => state.user);
  const token = user.credentials.token;
  const dispatch = useDispatch();
  const position = user.position;
  const currentRecipes = user.plannedRecipes.currentRecipes;

  //retrives best prices for each store whenever our list of  recipes changes.
  useEffect(() => {
    (async () => {
      //stores each ingredients and their respective qty in ingredietnsdata variable
      const ingredientsData = currentRecipes.flatMap((recipe) => {
        return recipe.id.ingredients.map((ingredient) => {
          return {
            qtyForRecipe: recipe.nb * ingredient.amount,
            name: ingredient.id.name,
            unit: ingredient.id.unit,
          };
        });
      });

      //regroups same ingredients and accumules qtyForRecipe for each
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

      //fecth backend with a list of unique ingredients nand their amount
      const response = await fetch(`${ROUTE}/stores/lowestPrices`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredientsList: groupedIngredients.map((e) => ({
            name: e.name,
            amount: e.qtyForRecipe,
          })),
        }),
      });
      const data = await response.json();

      //stores retrieved best prices for each store in ingredientAndStore state
      setIngredientsAndStore({
        ingredients: groupedIngredients,
        stores: data.response,
      });
    })();
  }, [currentRecipes]);

  const handleDeleteIngredient = (name) => {
    setIngredientsAndStore({
      ...ingredientsAndStore,
      ingredients: ingredientsAndStore.ingredients.filter(
        (e) => e.name !== name
      ),
    });
  };

  //displays ingredients and their individual price.
  const ingredientsList = ingredientsAndStore.ingredients.map((e, i) => (
    <Ingredient
      handleDeleteIngredient={handleDeleteIngredient}
      key={i}
      {...e}
      price={ingredientsAndStore.stores[ref].products[e.name].reference.TOTAL.toFixed(2)}
    />
  ));

  //stores and formats the values of each stores and calculates total value of basket for each.
  const filter = ingredientsAndStore.stores.map((e, i) => ({
    name: e.store.name,
    logo: e.store.logo,
    price: Object.values(ingredientsAndStore.stores[i].products)
      .reduce((acc, obj) => acc + obj.reference.TOTAL, 0)
      .toFixed(2),
    distance: calculateDistance(
      e.store.coordinates.location.coordinates[1],
      e.store.coordinates.location.coordinates[0],
      position.lat,
      position.lon,
    ).toFixed(2),
  }));

  //displays stores information: total price, logo & distance
  const filterList = filter.map((e, i) => {
    return (
      <TouchableOpacity
        key={i}
        onPress={() => setRef(i)}
        style={{
          ...styles.filterContainer,
          backgroundColor: ref === i ? "#ee9f68" : "transparent",
        }}
      >
        <Image style={styles.filterIcon} source={{ uri: e.logo }} />
        <Text style={styles.filterPrice}>{e.price} €</Text>
        <Text style={styles.filterDistance}>{e.distance} km</Text>
      </TouchableOpacity>
    );
  });

  //validates the basket, emptys current recipes, "archives" them in history recipes.
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${ROUTE}/users/archive`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      dispatch(modifyHistory(currentRecipes));
      dispatch(modifyCurrentRecipe([]));
      setIngredientsAndStore({ ingredients: [], stores: [] });
    } catch (error) {
      console.error("Error while archiving recipes:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        style={styles.filterList}
      >
        {filterList}
      </ScrollView>
      {currentRecipes.length > 0 ? (
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
      ) : (
        <View style={styles.emptyContent}>
          <Text style={styles.emptyText}>Vos courses sont terminées</Text>
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
    width: 60,
    height: 60,
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
