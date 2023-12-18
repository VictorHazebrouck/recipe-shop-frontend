import { Button, StyleSheet, Text, View } from "react-native";
import SmallButton from "../components/SmallButton";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../reducers/user";

export default function FavStoreScreen({ navigation }) {
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.user)
  const token = user.credentials.token
  const isLoggedIn = user.isLoggedIn

  const handleNext = () => {
    if (isLoggedIn) {
      navigation.navigate("TabNavigator", { screen: "Parameters" });
    } else {
      navigation.navigate("TabNavigator");
      dispatch(setLogin())
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
