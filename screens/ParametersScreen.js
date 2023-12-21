import {
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import SmallButton from "../components/SmallButton";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../reducers/user";

export default function ParametersScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const confirmDisconnect = () =>
    Alert.alert("Voulez-vous vous déconnecter ?", "", [
      {
        text: "non",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "oui",
        onPress: () => {
          dispatch(setLogout());
          navigation.navigate("Connexion");
        },
      },
    ]);

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
            name="Déconnexion"
            isPlain={true}
            // onPress={() => navigation.navigate("Connexion")}
            onPress={confirmDisconnect}
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
    justifyContent: "center",
  },
  profil: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#C9AFBD",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 20,
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
    padding: 20,
    borderRadius: 6,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 50,
  },
});
