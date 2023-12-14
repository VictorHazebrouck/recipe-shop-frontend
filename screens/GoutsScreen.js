import { Button, StyleSheet, Text, View } from "react-native";

export default function GoutsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Gouts Screen</Text>
      <Button
        title="suivant"
        onPress={() => navigation.navigate("Affichage")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
  },
});
