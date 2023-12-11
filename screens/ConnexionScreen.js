import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  View,
  Dimensions,
  Modal,
} from "react-native";

export default function ConnexionScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [modalSignupVisible, setModalSignupVisible] = useState(false);
  const [modalSigninVisible, setModalSigninVisible] = useState(false);

  // useEffect(() => {
  //   async function loadFonts() {
  //     await Font.loadAsync({
  //       Anton: require("../assets/fonts/Anton-Regular.ttf"),
  //     });
  //   }
  //   loadFonts();
  // }, []);

  const handleModalSignup = () => {
    setModalSignupVisible(true);
  };
  const handleModalSignin = () => {
    setModalSigninVisible(true);
  };

  const handleSubmit = () => {
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    fetch("https://recipe-shop-backend.vercel.app/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          navigation.navigate("Regime");
        } else {
          setError(true);
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleModalSignin()}
      >
        <Text style={styles.textButton}>sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleModalSignup()}
      >
        <Text style={styles.textButton}>sign up</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSignupVisible}
        onRequestClose={() => setModalSignupVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.h3}>Sign up</Text>
            <TextInput
              placeholder="name"
              onChangeText={(value) => setName(value)}
              value={name}
              style={styles.nameInput}
            />
            <TextInput
              placeholder="email"
              onChangeText={(value) => setEmail(value)}
              value={email}
              style={styles.emailInput}
            />
            <TextInput
              placeholder="password"
              onChangeText={(value) => setPassword(value)}
              value={password}
              style={styles.passwordInput}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.textButton}>valider</Text>
            </TouchableOpacity>
            {error && (
              <Text style={styles.error}>cet utilisateur existe déjà</Text>
            )}
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSigninVisible}
        onRequestClose={() => setModalSigninVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.h3}>Sign in</Text>
            <TextInput
              placeholder="name"
              onChangeText={(value) => setName(value)}
              value={name}
              style={styles.nameInput}
            />
            <TextInput
              placeholder="password"
              onChangeText={(value) => setPassword(value)}
              value={password}
              style={styles.passwordInput}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleModalSignin()}
            >
              <Text style={styles.textButton}>valider</Text>
            </TouchableOpacity>
            {error && (
              <Text style={styles.error}>cet utilisateur n'existe pas</Text>
            )}
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F8F8",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth,
    backgroundColor: "rgba(0,0,0,.4)",
  },
  modal: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 40,
    borderRadius: 20,
  },
  h3: {
    // fontFamily: "Anton",
    fontSize: 30,
    marginBottom: 10,
  },
  nameInput: {
    borderColor: "#937B8A",
    borderWidth: 1,
    width: 280,
    height: 42,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  emailInput: {
    borderColor: "#937B8A",
    borderWidth: 1,
    width: 280,
    height: 42,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  passwordInput: {
    borderColor: "#937B8A",
    borderWidth: 1,
    width: 280,
    height: 42,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    width: 280,
    height: 53,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CC3F0C",
    borderRadius: 10,
    marginBottom: 10,
  },
  textButton: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 500,
  },
  error: {
    color: "red",
    fontSize: 16,
  },
});
