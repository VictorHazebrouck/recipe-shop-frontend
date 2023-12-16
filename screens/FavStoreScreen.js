import { Button, StyleSheet, Text, View } from "react-native";
import MyButton from "../components/MyButton";
import { useSelector } from "react-redux";

export default function FavStoreScreen({ navigation }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleNext = () => {
    if (isLoggedIn) {
      navigation.navigate("TabNavigator", { screen: "Parameters" });
    } else {
      navigation.navigate("TabNavigator");
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
        FAVORITE STORE
      </Text>
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
    backgroundColor: "aqua",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: "auto",
    width: 200,
    marginBottom: 50,
  },
});
