import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import LargeButton from "../components/LargeButton";
import SmallButton from "../components/SmallButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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

  // const data = regimeList.map((e, i) => {
  //   console.log(e);
  //   return (
  //     <SmallButton
  //       key={i}
  //       name={e}
  //       onPress={() => handleRegime(e)}
  //       isPlain={regimes.some((x) => x === e) ? true : false}
  //     />
  //   );
  // });

  const data = regimeList.map((e, i) => {
    const iconComponent =
      e === "Pesco-végétarien" ? (
        <FontAwesome5 name={"fish"} size={50} color="#fff" />
      ) : e === "Sans lactose" ? (
        <Image source={require("../assets/lait.png")} />
      ) : e === "Sans gluten" ? (
        <Image source={require("../assets/gluten.png")} />
      ) : e === "Sans porc" ? (
        <Image source={require("../assets/porc.png")} />
      ) : e === "Vegan" ? (
        <Image source={require("../assets/vegan.png")} />
      ) : e === "Végétarien" ? (
        <Image source={require("../assets/vegetarien.png")} />
      ) : null;

    return (
      <View style={{ alignItems: "center" }} key={i}>
        <TouchableOpacity
          onPress={() => handleRegime(e)}
          style={{
            ...styles.button,
            backgroundColor: regimes.some((x) => x === e)
              ? "#921706"
              : "#CC3F0C",
          }}
        >
          {iconComponent}
        </TouchableOpacity>
        <Text style={{ color: "#937B8A", fontSize: 16 }}>{e}</Text>
      </View>
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
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}></View>
        <View style={styles.progress}></View>
      </View>
      <Text style={styles.title}>REGIME</Text>
      <View style={styles.content}>{data}</View>
      <View style={{ position: "absolute", bottom: 50 }}>
        <LargeButton onPress={handleNext} name="suivant" isPlain={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#F9F8F8",
    alignItems: "center",
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
    width: 75,
    height: 14,
  },
  title: {
    fontSize: 40,
    color: "#4B3B47",
    alignSelf: "flex-start",
    marginBottom: 18,
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: 300,
  },
  button: {
    // marginTop: "auto",
    // width: 200,
    // marginBottom: 50,
    width: 80,
    height: 80,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    backgroundColor: "#CC3F0C",
  },
});
