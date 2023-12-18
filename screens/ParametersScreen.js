import { SafeAreaView, Button, StyleSheet, Text, View } from "react-native";
import SmallButton from "../components/SmallButton";

export default function ParametersScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {<Text style={styles.title}>JohnDoe</Text>}

      <View style={styles.buttonsContainer}>
        <SmallButton
          name="Regime"
          onPress={() => navigation.navigate("Regime")}
          styleButton={{ marginBottom: 10 }}
        />
        <SmallButton
          name="Gouts"
          onPress={() => navigation.navigate("Gouts")}
          styleButton={{ marginBottom: 10 }}
        />
        <SmallButton
          name="Affichage"
          onPress={() => navigation.navigate("Affichage")}
          styleButton={{ marginBottom: 10 }}
        />
        <SmallButton
          name="Magasin Favori"
          onPress={() => navigation.navigate("FavStore")}
          styleButton={{ marginBottom: 10 }}
        />
        <SmallButton
          name="Manage account"
          isPlain={true}
          onPress={() => navigation.navigate("ManageAccount")}
          styleButton={{ marginBottom: 10 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 50,
  },
});
