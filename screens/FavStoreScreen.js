import { Button, StyleSheet, Text, View } from "react-native";
import MyButton from "../components/MyButton";

export default function FavStoreScreen({ navigation }) {
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
      <MyButton onPress={() => navigation.navigate("TabNavigator")} name="suivant" isPlain={true} styleButton={styles.button}/>
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
  button:{
    marginTop: "auto",
    width: 200,
    marginBottom: 50,
  },
});
