import { Button, StyleSheet, Text, View, Image } from "react-native";
import SmallButton from "../components/SmallButton";
import { useState } from "react";
import ROUTE from "../globals/nico";
import { useDispatch, useSelector } from "react-redux";
import { modifyRegime } from "../reducers/user";

const regimeList = [
  "Pesco-végétarien",
  "Sans lactose",
  "Sans gluten",
  "Sans porc",
  "Vegan",
  "Végétarien",
];

//turn category into allergens to exclue
const encodeRegime = (arr) => {
  const ref = [];
  if (arr.includes("Vegan"))
    ref.push("Oeuf", "Lait", "Fruits de Mer", "Poisson", "Viande", "Porc");
  if (arr.includes("Végétarien"))
    ref.push("Fruits de Mer", "Poisson", "Viande", "Porc");
  if (arr.includes("Sans porc")) ref.push("Porc");
  if (arr.includes("Sans gluten")) ref.push("Gluten");
  if (arr.includes("Sans lactose")) ref.push("Lait");
  if (arr.includes("Pesco-végétarien")) ref.push("Viande", "Porc");
  return [...new Set(ref)];
};

//turn allergens into categories
const decodeRegime = (arr) => {
  const ref = [];
  if (
    ["Oeuf", "Lait", "Fruits de Mer", "Poisson", "Viande", "Porc"].every((e) =>
      arr.includes(e)
    )
  ) {
    ref.push("Vegan");
  } else if (
    ["Fruits de Mer", "Poisson", "Viande", "Porc"].every((e) => arr.includes(e))
  ) {
    ref.push("Végétarien");
  } else if (["Viande", "Porc"].every((e) => arr.includes(e))) {
    ref.push("Pesco-végétarien");
  }
  if (arr.includes("Porc")) ref.push("Sans porc");
  if (arr.includes("Gluten")) ref.push("Sans gluten");
  if (arr.includes("Lait")) ref.push("Sans lactose");
  return [...new Set(ref)];
};

export default function RegimeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.credentials.token;
  const userRegime = user.preferences.regime;
  const isLoggedIn = user.isLoggedIn;
  const [regimes, setRegimes] = useState(decodeRegime(userRegime));

  const handleRegime = (e) => {
    const ref = ["Végétarien", "Vegan", "Pesco-végétarien"];
    if (regimes.includes(e)) {
      setRegimes(regimes.filter((x) => x !== e));
    } else if (ref.includes(e)) {
      const data = [...regimes].filter((x) => !ref.includes(x));
      setRegimes([...data, e]);
    } else {
      setRegimes([...regimes, e]);
    }
  };

  const data = regimeList.map((e, i) => {
    return (
      <SmallButton
        key={i}
        name={e}
        onPress={() => handleRegime(e)}
        isPlain={regimes.some((x) => x === e) ? true : false}
      />
    );
  });

  const handleNext = async () => {
    const response = await fetch(`${ROUTE}/users/preference`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ regime: encodeRegime(regimes), token }),
    });
    const data = await response.json();
    dispatch(modifyRegime(encodeRegime(regimes)));
    if (isLoggedIn) {
      navigation.navigate("TabNavigator", { screen: "Parameters" });
    } else {
      navigation.navigate("Gouts");
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
        REGIME
      </Text>
      {data}
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
    backgroundColor: "yellow",
    alignItems: "center",
  },
  button: {
    marginTop: "auto",
    width: 200,
    marginBottom: 50,
  },
  title: {},
});
