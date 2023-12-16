import { Button, StyleSheet, Text, View } from "react-native";
import MyButton from "../components/MyButton";
import SearchDropdown from "../components/SeachDropdown";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  const [ingredientsUnselected, setIngredientsUnselected] =
    useState(regimeList);
  const [ingredientsSelected, setIngredientsSelected] = useState([]);
  const [customSelected, setCustomSelected] = useState([]);

  const data = ingredientsUnselected.map((e, i) => {
    return (
      <MyButton
        key={i}
        name={e}
        onPress={() => {
          setIngredientsSelected([...ingredientsSelected, e]);
          setIngredientsUnselected(
            ingredientsUnselected.filter((x) => x !== e)
          );
        }}
        isPlain={false}
      />
    );
  });

  const dataSelected = ingredientsSelected.map((e, i) => {
    return (
      <MyButton
        key={i}
        name={e}
        onPress={() => {
          setIngredientsUnselected([...ingredientsUnselected, e]);
          setIngredientsSelected(ingredientsSelected.filter((x) => x !== e));
        }}
        isPlain={true}
      />
    );
  });

  const dataCustomSelected = customSelected.map((e, i) => {
    return (
      <MyButton
        key={i}
        name={e.name}
        onPress={() => {
          setCustomSelected(customSelected.filter((x) => x.name !== e.name));
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
    setCustomSelected([...customSelected, data]);
  };

  const handleNext = async () => {
    /**
     * @todo ajouter les gouts au user, ajouter les categories sans ecraser les regimes precedetns
     */
    /*const response = await fetch('',{
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
    const data = response.json()
    console.log(data);*/
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
      {data}
      <Text>Ingrédients exclus</Text>
      {dataSelected}
      {dataCustomSelected}
      <MyButton
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
