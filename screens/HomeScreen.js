import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
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
];
const userList = ["Mes coups de coeur", "Mes recettes"];
import { useSelector } from "react-redux";

export default function HomeScreen({ navigation, route }) {
  const user = useSelector((state) => state.user);
  const token = user.credentials.token;
  const preferences = user.preferences;
  const likedRecipes = user.personalRecipes.favoriteRecipes;
  const myRecipes = user.personalRecipes.myRecipes;

  const [filter, setFilter] = useState("A la une");
  const [recipes, setRecipes] = useState({});
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [chosenDay, setChosenDay] = useState("");

  const [referenceList, setReferenceList] = useState(tagsList);
  //const [isPersonal]

  useEffect(() => {
    if (route.params) {
      setChosenDay(route.params);
    }
  }, [route.params]);

  //Updates the recipes state according to the value of the filter state
  useEffect(() => {
    (async () => {
      if (filter === "Mes recettes" || filter === "Mes coups de coeur") {
        const idsList = filter === "Mes recettes" ? myRecipes : likedRecipes;

        if (!idsList || !idsList.length > 0) {
          //if no items liked or saved, return
          setRecipes({ ...recipes, [filter]: [] })
          return
        }

        console.log(idsList);

        const response = await fetch(
          `${ROUTE}/recipes/populateIds?idsList=${idsList
            .map((e) => e._id)
            .join(",")}`
        );
        const data = await response.json();
        
        setRecipes({ ...recipes, [filter]: data.response })
      } else if (!recipes[filter]) {
        //fetch & update recipes on first filter load
        const response = await fetch(
          `${ROUTE}/recipes/search?&tag=${filter}&regime=${preferences.regime.join(
            ","
          )}`
        );
        const data = await response.json();
        setRecipes({ ...recipes, [filter]: data.response });
      } else {
        //don't re-fetch data for a previously fetched list of recipes
        return;
      }
    })();
  }, [filter]);

  const filters = referenceList.map((e, i) => {
    return (
      <TouchableOpacity key={i} onPress={() => setFilter(e)}>
        <Text
          style={
            filter === e ? styles.filterSelected : styles.filterNonSelected
          }
        >
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
    setChosenDay("");
    setModalVisible(false);
  };
  const handlePressUserLikes = () => {
    if (referenceList === tagsList) {
      setReferenceList(userList);
      setFilter(userList[0]);
    } else {
      setReferenceList(tagsList);
      setFilter(tagsList[0]);
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} animationType="slide">
        {chosenDay !== "" ? (
          <RecipeModal
            {...currentRecipe}
            closeModal={closeModal}
            chosenDay={chosenDay}
          />
        ) : (
          <RecipeModal {...currentRecipe} closeModal={closeModal} />
        )}
      </Modal>
      <Modal visible={isSearchModal}>
        <SearchRecipesModal closeSearchModal={() => setIsSearchModal(false)} />
      </Modal>
      <View style={styles.containerTop}>
        <TouchableOpacity onPress={handlePressUserLikes}>
          <FontAwesome
            name={referenceList === tagsList ? "heart-o" : "heart"}
            size={25}
            color="#CC3F0C"
          />
        </TouchableOpacity>
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
