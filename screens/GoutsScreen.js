import { Button, StyleSheet, Text, View } from "react-native";
import SmallButton from "../components/SmallButton";
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

export default function GoutsScreen({ navigation }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const regime = useSelector((state) => state.user.preferences.regime);
  const customRegime = regime.filter((e) => regimeList.includes(e));
  const excludeAliments = useSelector(
    (state) => state.user.preferences.excludeAliments
  );
  const [ingeridentCategoryUnselcted, setIngeridentCategoryUnselcted] =
    useState(regimeList.filter((e) => !customRegime.includes(e)));
  const [ingeridentCategorySelected, setIngeridentCategorySelected] =
    useState(customRegime);
  const [ingeridentSelected, setIngeridentSelected] = useState(excludeAliments);

  const categoriesUnselected = ingeridentCategoryUnselcted.map((e, i) => {
    return (
      <SmallButton
        key={i}
        name={e}
        onPress={() => {
          setIngeridentCategorySelected([...ingeridentCategorySelected, e]);
          setIngeridentCategoryUnselcted(
            ingeridentCategoryUnselcted.filter((x) => x !== e)
          );
        }}
        isPlain={false}
      />
    );
  });

  const categoriesSelected = ingeridentCategorySelected.map((e, i) => {
    return (
      <SmallButton
        key={i}
        name={e}
        onPress={() => {
          setIngeridentCategoryUnselcted([...ingeridentCategoryUnselcted, e]);
          setIngeridentCategorySelected(
            ingeridentCategorySelected.filter((x) => x !== e)
          );
        }}
        isPlain={true}
      />
    );
  });

  const ingredientsSelectedData = ingeridentSelected.map((e, i) => {
    return (
      <SmallButton
        key={i}
        name={e.name}
        onPress={() => {
          setIngeridentSelected(
            ingeridentSelected.filter((x) => x.name !== e.name)
          );
        }}
        isPlain={true}
      />
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
    setIngeridentSelected([...ingeridentSelected, data]);
  };

  const handleNext = async () => {
    const newRegime = [...new Set([...regime, ...ingeridentCategorySelected])];
    const response = await fetch(`${ROUTE}/users/preference`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        regime: newRegime,
        excludeAliments: ingeridentSelected,
      }),
    });
    const data = await response.json();

    if (ingeridentSelected) {
      dispatch(modifyExcludeIngredients(ingeridentSelected));
    }
    dispatch(modifyRegime(newRegime));

    if (isLoggedIn) {
      navigation.navigate("TabNavigator", { screen: "Parameters" });
    } else {
      navigation.navigate("Affichage");
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        GOUTS
      </Text>
      <Text>Choisissez des ingrédients que vous n'aimez pas</Text>
      <SearchDropdown
        onInputChange={handleInputChange}
        onResultSelection={handleResultSelection}
        placeholder="Rechercher des ingrédients à exclure"
      />
      {categoriesUnselected}
      <Text>Ingrédients exclus</Text>
      {categoriesSelected}
      {ingredientsSelectedData}
      <SmallButton
        onPress={handleNext}
        name="suivant"
        isPlain={true}
        styleButton={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: "auto",
    width: 200,
    marginBottom: 50,
  },
});
