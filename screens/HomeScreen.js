import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import RecipeModal from "../components/RecipeModal";
import RecipeCard from "../components/RecipeCard";
import SearchRecipesModal from "../components/SearchRecipesModal";
import ROUTE from "../globals/nico";
const tagsList = [
  "A la une",
  "Pas cher",
  "Peu de vaisselle",
  "Pour les fetes",
  "A cuisiner en famille",
  "Pour les enfant",
  "Express",
];

export default function HomeScreen({ navigation }) {
  const [filter, setFilter] = useState("A la une");
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSearchModal, setIsSearchModal] = useState(true);

  //Updates the recipes state according to the value of the filter state
  useEffect(() => {
    (async () => {
      if (!recipes[filter]) {
        //data not yet saved => fetch & update
        const response = await fetch(`${ROUTE}/recipes/find/tag=${filter}`);
        const data = await response.json();
        setRecipes({ ...recipes, [filter]: data.res });
      } else {
        //already saved => do nothing
        return;
      }
    })();
  }, [filter]);

  const filters = tagsList.map((e, i) => {
    return (
      <TouchableOpacity key={i} onPress={() => setFilter(e)}>
        <Text style={filter === e ? styles.filterSelected : styles.filterNonSelected}>
          {e}
        </Text>
      </TouchableOpacity>
    );
  });

  const handlePressCard = (dataRecipe) => {
    setCurrentRecipe(dataRecipe);
    setModalVisible(true);
  };

  const recipesList =
    recipes[filter] &&
    recipes[filter].map((e, i) => (
      <RecipeCard key={i} {...e} handlePressCard={handlePressCard} />
    ));

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} animationType="slide">
        <RecipeModal {...currentRecipe} closeModal={closeModal} />
      </Modal>
      <Modal visible={isSearchModal}>
        <SearchRecipesModal closeSearchModal={() => setIsSearchModal(false)} />
      </Modal>
      <View style={styles.containerTop}>
        <Text style={styles.topTitle}>Les recettes</Text>
        <TouchableOpacity onPress={() => setIsSearchModal(true)}>
          <FontAwesome name={"search"} size={25} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={styles.containerFilters}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
        >
          {filters}
        </ScrollView>
      </View>
      <ScrollView
        vertical
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerRecipes}
      >
        {recipesList}
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

  containerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  topTitle: {
    fontSize: 30,
    fontWeight: "700",
  },

  containerFilters: {
    height: 55,
    backgroundColor: "white",
  },
  filtersScroll: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 10,
  },
  filterNonSelected: {
    fontSize: 16,
    fontWeight: "800",
    color: "gray",
    paddingHorizontal: 10,
  },
  filterSelected: {
    fontSize: 22,
    fontWeight: "800",
    color: "black",
    paddingHorizontal: 8,
  },

  containerRecipes: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 15,
  },
});
