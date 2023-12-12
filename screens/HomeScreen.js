import FontAwesome from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, Dimensions, Modal, } from "react-native";
import { useState, useEffect } from "react";
import RecipeModal from "../components/RecipeModal";
import RecipeCard from "../components/RecipeCard";
import ROUTE from "../globals/nico";
const tagsList = ["A la une","Pas cher","Peu de vaisselle","Pour les fetes","A cuisiner en famille","Pour les enfant","Express",];

export default function HomeScreen({ navigation }) {
  const [filter, setFilter] = useState("A la une");
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePressCard = (dataRecipe) => {
    // console.log(dataRecipe);
    setCurrentRecipe(dataRecipe);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  const filters = tagsList.map((e, i) => {
    return (
      <TouchableOpacity key={i} onPress={() => setFilter(e)}>
        <Text style={filter === e ? styles.filterSelected : styles.filterNonSelected}>{e}</Text>
      </TouchableOpacity>
    )
  })


  
  //Updates the recipes state according to the value of the filter state
  useEffect(() => {
    (async () => {
      if (!recipes[filter]) {//data not yet saved => fetch & update
        const response = await fetch(`${ROUTE}/recipes/find/tag=${filter}`)
        const data = await response.json(); 
        setRecipes({ ...recipes, [filter]: data.res })
      } else { //already saved => do nothing
        return
      }
    })()
  }, [filter])

  const recipesList = recipes[filter] && recipes[filter].map((e, i) => {
    return (
      <TouchableOpacity key={i}>
        <RecipeCard {...e} handlePressCard={handlePressCard} />
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible}>
        <RecipeModal {...currentRecipe} closeModal={closeModal} />
      </Modal>
      <View style={styles.containerTop}>
        <Text style={styles.topTitle}>Les recettes</Text>
        <FontAwesome name={"search"} size={25} color='gray' />
      </View>
      <View style={styles.containerFilters}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}>
          {filters}
        </ScrollView>
      </View>
      <ScrollView
        vertical
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerRecipes}>
        {recipesList}
      </ScrollView>
    </View>
  );
}


const screenWidth = Dimensions.get("window").width;
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
    flexDirection: 'row',
    alignItems: 'flex-end',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 15,
  },
  recipesCard: {
    height: windowWidth * 58 / 100,
    width: windowWidth * 48 / 100,
    backgroundColor: 'red',
    margin: "1%",
    flexDirection: 'column',
  }
})