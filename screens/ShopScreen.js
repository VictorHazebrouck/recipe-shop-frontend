import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState, useEffect } from "react";
import SmallButton from "../components/SmallButton";
import Ingredient from "../components/Ingredient";
import { useDispatch, useSelector } from "react-redux";
import { modifyCurrentRecipe, modifyHistory } from "../reducers/user";
import ROUTE from "../globals/nico";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function ShopScreen({ navigation }) {
  const [ingredients, setIngredients] = useState([]);
  const [stores, setStores] = useState([]);
  const [ref, setRef] = useState(0);
  const user = useSelector((state) => state.user);
  const token = user.credentials.token;
  const dispatch = useDispatch();

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
      setStores(data.response);
      setIngredients(groupedIngredients);
    })();
  }, [currentRecipes]);

  const handleDeleteIngredient = (name) => {
    setIngredients(ingredients.filter((e) => e.name !== name));
  };

  const ingredientsList = ingredients.map((e, i) => (
    <Ingredient
      handleDeleteIngredient={handleDeleteIngredient}
      key={i}
      {...e}
      price={stores[ref].products[e.name].reference.TOTAL}
    />
  ));

  // le filter est a aller fetch depuis la database des magasins
  const filter = stores.map((e, i) => ({
    name: e.store.name,
    logo: e.store.logo,
    price: Object.values(stores[i].products).reduce(
      (acc, obj) => acc + obj.reference.TOTAL,
      0
    ),
    distance: 4.2,
  }));

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
      <TouchableOpacity
        key={i}
        onPress={() => setRef(i)}
        style={styles.filterContainer}
      >
        <View style={styles.filterIcon}>{iconComponent}</View>
        <Text style={styles.filterPrice}>{e.price} €</Text>
        <Text style={styles.filterDistance}>{e.distance} km</Text>
      </TouchableOpacity>
    );
  });

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
      setIngredients([]);
      setStores([]);
    } catch (error) {
      console.error("Error while archiving recipes:", error.message);
    }
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
