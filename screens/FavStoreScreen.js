import { Button, StyleSheet, Text, View } from "react-native";

export default function FavStoreScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>FavStore Screen</Text>
      <Button
        title="suivant"
        onPress={() => navigation.navigate("TabNavigator")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aqua",
    alignItems: "center",
    justifyContent: "center",
  },
});
