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
import ROUTE from "../globals/nico";
const dishType = ["Entrée", "Plat", "Dessert", "Apéro", "Autre"]
const difficulty = ["Easy", "Medium", "Hard"]
import Slider from '@react-native-community/slider';
import SearchBar from "../components/SearchBar";



export default function SearchRecipeModal({ navigation, closeSearchModal }) {
    const [isFilterVisible, setIsFilterVisible] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [sliderValue, setSliiderValue] = useState(135);
    const [dishTypeFilter, setDishTypeFilter] = useState("")

    const handlePressCard = (dataRecipe) => {
        // console.log(dataRecipe);
        setCurrentRecipe(dataRecipe);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const displayFilters = (filterName, callBack) => {
        return filterName.map((e, i) => {
            return (
                <TouchableOpacity key={i} onPress={(e)=> callBack(e)}>
                    <Text
                    >
                        {e}
                    </Text>
                </TouchableOpacity>
            );
        });
    }

    const computeSliderValue = () => {
        if (sliderValue === 135) return "Pas de limite de temps"
        if (sliderValue / 60 >= 1) return `${Math.floor(sliderValue / 60)}H${sliderValue % 60}`
        if (sliderValue === 15) return "moins de 15min"
        if (sliderValue / 60 < 1) return `${sliderValue}min`
    }

    const handleInputChange = (input) => {
        console.log(input);
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerTop}>
                <View style={styles.containerInput}>
                    <TouchableOpacity onPress={() => closeSearchModal()} activeOpacity={1} style={{ height: 40, justifyContent: "center", paddingHorizontal: 15 }}>
                        <FontAwesome name={"arrow-left"} size={23} color='gray' />
                    </TouchableOpacity>
                    <SearchBar onInputChange={handleInputChange} placeholder="Rechercher une recette" />
                </View>
                <TouchableOpacity onPress={() => setIsFilterVisible(!isFilterVisible)} style={styles.showFilters}>
                    <FontAwesome name={!isFilterVisible ? "angle-double-down" : "angle-double-up"} size={23} color={"gray"} />
                </TouchableOpacity>
                {isFilterVisible && (
                    <View style={styles.containerFilters}>
                        <Text>Type</Text>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.filtersScroll}
                        >
                            {displayFilters(dishType, ()=>setDishTypeFilter())}
                        </ScrollView>

                        <Text>Difficulté</Text>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.filtersScroll}
                        >
                            {displayFilters(difficulty, ()=>setDishTypeFilter())}
                        </ScrollView>

                        <Text>Temps de préparation</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Slider
                                style={{ width: 200, height: 40 }}
                                minimumValue={15}
                                maximumValue={135}
                                minimumTrackTintColor="red"
                                maximumTrackTintColor="#000000"
                                onValueChange={(e) => setSliiderValue(e)}
                                value={sliderValue}
                                step={15}
                            />
                        </View>
                        <Text>
                            {computeSliderValue()}
                        </Text>
                    </View>
                )}
            </View>

            <ScrollView
                vertical
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.containerRecipes}
            >
            </ScrollView>
            <Modal visible={modalVisible}>
                <RecipeModal {...currentRecipe} closeModal={closeModal} />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "flex-start",
        backgroundColor: "#F9F8F8",
        paddingTop: 30,
    },
    containerTop: {

    },
    containerInput: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        height: 40,
        paddingRight: 5,
    },
    showFilters: {
        backgroundColor: "white",
        marginHorizontal: 30,
        marginTop: 8,
        alignItems: "center"
    },



    containerFilters: {
        backgroundColor: "white",
        marginVertical: 5,
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
