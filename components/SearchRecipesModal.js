import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import RecipeModal from "./RecipeModal";
import RecipeCard from "./RecipeCard";
import ROUTE from "../globals/nico";
import Slider from "@react-native-community/slider";
import SearchBar from "./SearchBar";
import SmallButton from "./SmallButton";
import MyCheckbox from "./MyCheckbox";

const dishType = ["Entrée", "Plat", "Dessert", "Apéro", "Autre"];
const difficulty = ["Easy", "Medium", "Hard"];
const screenWidth = Dimensions.get("window").width;

export default function SearchRecipeModal({ navigation, closeSearchModal }) {
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [timeFilter, setTimeFilter] = useState(135);
  const [dishTypeFilter, setDishTypeFilter] = useState("");
  const [difficultyFilter, setDiffictultyFilter] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      const queryString = `input=${inputValue}&time=${timeFilter}&type=${dishTypeFilter}&difficulty=${difficultyFilter}`;
      const response = await fetch(`${ROUTE}/recipes/search?${queryString}`);
      const data = await response.json();
      setRecipes(data.response);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [inputValue, timeFilter, dishTypeFilter, difficultyFilter]);

  const dishTypesFilters = dishType.map((e, i) => {
    return (
      <SmallButton
        key={i}
        name={e}
        onPress={() =>
          e === dishTypeFilter ? setDishTypeFilter("") : setDishTypeFilter(e)
        }
        isPlain={e === dishTypeFilter && true}
        styleButton={{
          paddingVertical: 4,
          paddingHorizontal: 10,
          marginLeft: 8,
        }}
        styleText={{ fontWeight: 600, fontSize: 16 }}
      />
      // <MyCheckbox
      //   key={i}
      //   name={e}
      //   onPress={() =>
      //     e === dishTypeFilter ? setDishTypeFilter("") : setDishTypeFilter(e)
      //   }
      // />
    );
  });

  const difficultyFilters = difficulty.map((e, i) => {
    return (
      <SmallButton
        key={i}
        name={e}
        onPress={() =>
          e === difficultyFilter
            ? setDiffictultyFilter("")
            : setDiffictultyFilter(e)
        }
        isPlain={e === difficultyFilter && true}
        styleButton={{
          paddingVertical: 4,
          paddingHorizontal: 10,
          marginLeft: 8,
        }}
        styleText={{ fontWeight: 600, fontSize: 16 }}
      />
      // <MyCheckbox
      //   key={i}
      //   name={e}
      //   onPress={() =>
      //     e === difficultyFilter
      //       ? setDiffictultyFilter("")
      //       : setDiffictultyFilter(e)
      //   }
      // />
    );
  });

  const handlePressCard = (dataRecipe) => {
    setCurrentRecipe(dataRecipe);
    setModalVisible(true);
  };

  const recipesList = recipes.map((e, i) => {
    return (
      <RecipeCard key={i} {...e} handlePressCard={() => handlePressCard(e)} />
    );
  });

  const computetimeFilter = () => {
    if (timeFilter === 135) return "2H et plus";
    if (timeFilter / 60 >= 1)
      return `${Math.floor(timeFilter / 60)}H${timeFilter % 60}`;
    if (timeFilter === 15) return "moins de 15min";
    if (timeFilter / 60 < 1) return `${timeFilter}min`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={styles.containerInput}>
          <TouchableOpacity
            onPress={() => closeSearchModal()}
            style={styles.closeModal}
          >
            <FontAwesome name={"arrow-left"} size={23} color="#937B8A" />
          </TouchableOpacity>
          <SearchBar
            onInputChange={(input) => setInputValue(input)}
            placeholder="Rechercher une recette"
          />
        </View>
        <TouchableOpacity
          onPress={() => setIsFilterVisible(!isFilterVisible)}
          style={styles.showFilters}
        >
          <FontAwesome
            name={!isFilterVisible ? "angle-double-down" : "angle-double-up"}
            size={25}
            color={"gray"}
          />
        </TouchableOpacity>
        {isFilterVisible && (
          <View style={styles.containerFilters}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersScroll}
            >
              {dishTypesFilters}
            </ScrollView>
            <View style={styles.separation}></View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersScroll}
            >
              {difficultyFilters}
            </ScrollView>
            <View style={styles.separation}></View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  marginTop: 15,
                  color: "black",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  fontSize: 15,
                }}
              >
                {computetimeFilter()}
              </Text>
              <Slider
                style={{ width: "90%", height: 40 }}
                minimumValue={15}
                maximumValue={135}
                minimumTrackTintColor="#CC3F0C"
                maximumTrackTintColor="#000000"
                thumbTintColor="white"
                onValueChange={(e) => setTimeFilter(e)}
                value={timeFilter}
                step={15}
              />
            </View>
          </View>
        )}
      </View>
      <ScrollView
        vertical
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerRecipes}
      >
        {recipesList}
      </ScrollView>
      <Modal visible={modalVisible}>
        <RecipeModal
          {...currentRecipe}
          closeModal={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  containerTop: {
    width: screenWidth - 40,
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    width: screenWidth - 40,
    borderBottomWidth: 1,
    borderColorBottom: "#937B8A",
  },
  closeModal: {
    flex: 1,
  },
  showFilters: {
    backgroundColor: "#F9F8F8",
    alignItems: "center",
    borderRadius: 4,
    marginTop: 10,
  },
  filtersScroll: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingVertical: 15,
  },
  filterNonSelected: {
    fontSize: 16,
    fontWeight: "800",
    color: "#937B8A",
    paddingHorizontal: 10,
  },
  filterSelected: {
    fontSize: 22,
    fontWeight: "800",
    color: "#937B8A",
    paddingHorizontal: 8,
  },
  separation: {
    backgroundColor: "#937B8A",
    height: 1,
    width: screenWidth - 40,
    alignSelf: "center",
  },
  containerRecipes: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 15,
  },
});
