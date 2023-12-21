import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import LargeButton from "../components/LargeButton";
import SearchDropdown from "../components/SeachDropdown";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifyRegime, modifyExcludeIngredients } from "../reducers/user";
import ROUTE from "../globals/nico";

const regimeList = [
  "Fruits à Coques",
  "Arachides",
  "Fruits de Mer",
  "Oeuf",
  "Poisson",
  "Soja",
];

const screenWidth = Dimensions.get("window").width;

export default function GoutsScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.credentials.token;
  const isLoggedIn = user.isLoggedIn;

  const regime = user.preferences.regime;
  const excludeAliments = user.preferences.excludeAliments;

  const customRegime = regime.filter((e) => regimeList.includes(e));
  const [ingredientCategoryUnselected, setingredientCategoryUnselected] =
    useState(regimeList.filter((e) => !customRegime.includes(e)));
  const [ingredientCategorySelected, setingredientCategorySelected] =
    useState(customRegime);
  const [ingredientSelected, setIngredientSelected] = useState(excludeAliments);

  const categoriesUnselected = ingredientCategoryUnselected.map((e, i) => {
    return (
      <TouchableOpacity
        key={i}
        onPress={() => {
          setingredientCategorySelected([...ingredientCategorySelected, e]);
          setingredientCategoryUnselected(
            ingredientCategoryUnselected.filter((x) => x !== e)
          );
        }}
        style={styles.checkbox}
      >
        <Text style={styles.checkboxText}>{e}</Text>
      </TouchableOpacity>
    );
  });

  const categoriesSelected = ingredientCategorySelected.map((e, i) => {
    return (
      <TouchableOpacity
        key={i}
        onPress={() => {
          setingredientCategoryUnselected([...ingredientCategoryUnselected, e]);
          setingredientCategorySelected(
            ingredientCategorySelected.filter((x) => x !== e)
          );
        }}
        style={[styles.checkbox, styles.checked]}
      >
        <Text style={{ ...styles.checkboxText, color: "#fff" }}>{e}</Text>
      </TouchableOpacity>
    );
  });

  const ingredientsSelectedData = ingredientSelected.map((e, i) => {
    return (
      <TouchableOpacity
        key={i}
        onPress={() => {
          setIngredientSelected(
            ingredientSelected.filter((x) => x.name !== e.name)
          );
        }}
        style={[styles.checkbox, styles.checked]}
      >
        <Text style={{ ...styles.checkboxText, color: "#fff" }}>{e.name}</Text>
      </TouchableOpacity>
    );
  });

  const handleInputChange = async (inputValue) => {
    const response = await fetch(
      `https://recipe-shop-backend.vercel.app/ingredients/search/${inputValue}`
    );
    const data = await response.json();
    return data.res.map((e) => ({ ...e, _searchName: e.name }));
  };

  const handleResultSelection = (data) => {
    setIngredientSelected([...ingredientSelected, data]);
  };

  const handleNext = async () => {
    const newRegime = [...new Set([...regime, ...ingredientCategorySelected])];
    const response = await fetch(`${ROUTE}/users/preference`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        regime: newRegime,
        excludeAliments: ingredientSelected,
        token: token,
      }),
    });
    const data = await response.json();

    if (ingredientSelected) {
      dispatch(modifyExcludeIngredients(ingredientSelected));
    }
    dispatch(modifyRegime(newRegime));

    if (isLoggedIn) {
      navigation.navigate("TabNavigator", { screen: "Parameters" });
    } else {
      navigation.navigate("Affichage");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ alignItems: "center" }}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}></View>
          <View style={styles.progress}></View>
        </View>
        <Text style={styles.h2}>GOUTS</Text>
        <Text style={styles.subTitle}>
          Choisissez des ingrédients que vous n'aimez pas
        </Text>
        <View style={styles.content}>
          <SearchDropdown
            onInputChange={handleInputChange}
            onResultSelection={handleResultSelection}
            placeholder="Rechercher des ingrédients à exclure"
          />
          <View style={styles.unselectContainer}>{categoriesUnselected}</View>
          <Text style={styles.h4}>Ingrédients exclus</Text>
          <View style={styles.selectContainer}>{categoriesSelected}</View>
          <View style={styles.selectContainer}>{ingredientsSelectedData}</View>
        </View>
      </View>
      <LargeButton onPress={handleNext} name="suivant" isPlain={true} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 80,
    backgroundColor: "#F9F8F8",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressContainer: {
    position: "relative",
    width: 300,
    height: 14,
    marginBottom: 24,
  },
  progressBar: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#C9AFBD",
    width: 300,
    height: 14,
  },
  progress: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#4B3B47",
    width: 150,
    height: 14,
  },
  h2: {
    fontFamily: "Anton-reg",
    fontSize: 40,
    color: "#4B3B47",
    alignSelf: "flex-start",
    marginBottom: 18,
  },
  h4: {
    fontSize: 20,
    color: "#4B3B47",
    alignSelf: "flex-start",
    marginBottom: 18,
  },
  subTitle: {
    fontSize: 16,
    color: "#4B3B47",
    alignSelf: "flex-start",
    marginBottom: 18,
  },
  content: {
    justifyContent: "center",
    width: screenWidth - 40,
  },
  unselectContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 15,
  },
  selectContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  checkbox: {
    borderColor: "#C9AFBD",
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  checkboxText: {
    fontSize: 16,
    color: "#C9AFBD",
  },
  checked: {
    borderColor: "#4B3B47",
    backgroundColor: "#4B3B47",
  },
});
