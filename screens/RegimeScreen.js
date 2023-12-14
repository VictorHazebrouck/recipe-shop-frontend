import { Button, StyleSheet, Text, View, Image } from "react-native";

export default function RegimeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Regime Screen</Text>
      <Button title="suivant" onPress={() => navigation.navigate("Gouts")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
});
