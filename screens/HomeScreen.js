import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState, useEffect } from "react";
import RecipeModal from "../components/RecipeModal";
import RecipeCard from "../components/RecipeCard";
import SearchRecipesModal from "../components/SearchRecipesModal";
import ROUTE from "../globals/nico";
import { useDispatch, useSelector } from "react-redux";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  Image,
  KeyboardAvoidingView,
} from "react-native";

const tagsList = [
  "A la une",
  "Pas cher",
  "Peu de vaisselle",
  "Pour les fetes",
  "A cuisiner en famille",
  "Pour les enfant",
];
const userList = ["Mes coups de coeur", "Mes recettes"];

export default function HomeScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.credentials.token;
  const isLoggedIn = user.isLoggedIn;

  const preferences = user.preferences;
  const likedRecipes = user.personalRecipes.favoriteRecipes;
  const myRecipes = user.personalRecipes.myRecipes;

  const [filter, setFilter] = useState("A la une");
  const [recipes, setRecipes] = useState({});
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [chosenDay, setChosenDay] = useState("");
  const [modalClosedAlert, setModalClosedAlert] = useState(true);

  const [referenceList, setReferenceList] = useState(tagsList);
  //const [isPersonal]

  //fix @todo here
  useEffect(() => {
    if (route.params) {
      setChosenDay(route.params.day);
    }
  }, [route.params]);

  //Updates the recipes state according to the value of the filter state
  useEffect(() => {
    (async () => {
      if (filter === "Mes recettes" || filter === "Mes coups de coeur") {
        const idsList = filter === "Mes recettes" ? myRecipes : likedRecipes;

        if (!idsList || !idsList.length > 0) {
          //if no items liked or saved, return
          setRecipes({ ...recipes, [filter]: [] });
          return;
        }

        const response = await fetch(
          `${ROUTE}/recipes/populateIds?idsList=${idsList
            .map((e) => e._id)
            .join(",")}`
        );
        const data = await response.json();

        setRecipes({ ...recipes, [filter]: data.response });
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
  }, [filter, modalClosedAlert]);

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
    setModalClosedAlert(!modalClosedAlert);
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
        <Modal visible={isSearchModal} animationType="slide" transparent={true}>
          <SearchRecipesModal
            closeSearchModal={() => setIsSearchModal(false)}
          />
        </Modal>
        <View style={styles.containerTop}>
          <View style={styles.profil}>
            <Image
              source={require("../assets/profil.png")}
              style={styles.profilImg}
            />
            <View>
              <Text style={styles.bold}>
                Bonjour {user.credentials.name || "John Doe"}
              </Text>
              <Text style={styles.regular}>Que mange-t-on aujourd’hui ?</Text>
            </View>
          </View>
          <View style={styles.searchRecipes}>
            <TouchableOpacity
              onPress={handlePressUserLikes}
              style={{ width: 25 }}
            >
              <FontAwesome
                name={referenceList === tagsList ? "heart-o" : "heart"}
                size={25}
                color="#CC3F0C"
              />
            </TouchableOpacity>
            <Text style={styles.h3}>Les recettes</Text>
            <TouchableOpacity
              onPress={() => setIsSearchModal(true)}
              style={{ width: 25 }}
            >
              <FontAwesome name={"search"} size={25} color="gray" />
            </TouchableOpacity>
          </View>
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#F9F8F8",
  },
  containerTop: {
    // alignItems: "center",
    // justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  profil: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  profilImg: {
    marginRight: 10,
  },
  bold: {
    fontSize: 16,
    color: "#4B3B47",
    fontWeight: 600,
  },
  regular: {
    fontSize: 16,
    color: "#4B3B47",
    fontWeight: 400,
  },
  searchRecipes: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  h3: {
    fontFamily: "Anton-reg",
    fontSize: 30,
    color: "#4B3B47",
    flex: 1,
    textAlign: "center",
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
