import { SafeAreaView, Image, StyleSheet, Text, View } from "react-native";
import SmallButton from "../components/SmallButton";
import { useDispatch, useSelector } from "react-redux";

export default function ParametersScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLoggedIn = user.isLoggedIn;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.profil}>
          <Image
            source={require("../assets/profil.png")}
            style={styles.profilImg}
          />
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.bold}>
              {user.credentials.name || "John Doe"}
            </Text>
            <Text style={styles.regular}>Vos paramètres</Text>
          </View>
        </View>

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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: "#F9F8F8",
    alignItems: "center",
  },
  profil: {
    flexDirection: "row",
    justifyContent: "center",
    // alignSelf: "flex-start",
  },
  profilImg: {
    marginRight: 10,
  },
  bold: {
    fontSize: 16,
    color: "#4B3B47",
    fontWeight: 600,
  },
  regular: {
    fontSize: 16,
    color: "#4B3B47",
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 50,
  },
});
