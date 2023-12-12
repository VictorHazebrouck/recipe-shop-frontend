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
  const [nameSignin, setNameSignin] = useState("");
  const [passwordSignin, setPasswordSignin] = useState("");
  const [errorSignin, setErrorSignin] = useState(false);
  const [errorSigninMess, setErrorSigninMess] = useState("");
  const [modalSigninVisible, setModalSigninVisible] = useState(false);

  const [nameSignup, setNameSignup] = useState("");
  const [emailSignup, setEmailSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  const [errorSignup, setErrorSignup] = useState(false);
  const [errorSignupMess, setErrorSignupMess] = useState("");
  const [modalSignupVisible, setModalSignupVisible] = useState(false);

  const resetState = () => {
    setNameSignin("");
    setPasswordSignin("");
    setErrorSignin(false);
    setErrorSigninMess("");
    setModalSigninVisible(false);
    setNameSignup("");
    setEmailSignup("");
    setPasswordSignup("");
    setErrorSignup(false);
    setErrorSignupMess("");
    setModalSignupVisible(false);
  };

  const openModalSignup = () => {
    setModalSignupVisible(true);
  };
  const closeModalSignup = () => {
    setModalSignupVisible(false);
  };
  const openModalSignin = () => {
    setModalSigninVisible(true);
  };
  const closeModalSignin = () => {
    resetState();
  };

  const handleSignup = () => {
    const userData = {
      name: nameSignup,
      email: emailSignup,
      password: passwordSignup,
    };

    fetch("https://recipe-shop-backend.vercel.app/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          navigation.navigate("Regime");
        } else {
          setErrorSignup(true);
          setErrorSignupMess(data.error);
        }
      });
  };

  const handleSignin = () => {
    const userData = {
      name: nameSignin,
      password: passwordSignin,
    };

    fetch("https://recipe-shop-backend.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          navigation.navigate("Regime");
        } else {
          setErrorSignin(true);
          setErrorSigninMess(data.error);
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.buttonContent}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => openModalSignin()}
        >
          <Text style={styles.primaryTextButton}>sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => openModalSignup()}
        >
          <Text style={styles.secondaryTextButton}>sign up</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSignupVisible}
        onRequestClose={closeModalSignup}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={closeModalSignup}
        >
          <View style={styles.modal}>
            <Text style={styles.h3}>Sign up</Text>
            <TextInput
              placeholder="name"
              onChangeText={(value) => setNameSignup(value)}
              value={nameSignup}
              style={styles.nameInput}
            />
            <TextInput
              placeholder="email"
              onChangeText={(value) => setEmailSignup(value)}
              value={emailSignup}
              style={styles.emailInput}
            />
            <TextInput
              placeholder="password"
              onChangeText={(value) => setPasswordSignup(value)}
              value={passwordSignup}
              style={styles.passwordInput}
            />
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => handleSignup()}
            >
              <Text style={styles.primaryTextButton}>valider</Text>
            </TouchableOpacity>
            {errorSignup && <Text style={styles.error}>{errorSignupMess}</Text>}
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSigninVisible}
        onRequestClose={closeModalSignin}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={closeModalSignin}
        >
          <View style={styles.modal}>
            <Text style={styles.h3}>Sign in</Text>
            <TextInput
              placeholder="name"
              onChangeText={(value) => setNameSignin(value)}
              value={nameSignin}
              style={styles.nameInput}
            />
            <TextInput
              placeholder="password"
              onChangeText={(value) => setPasswordSignin(value)}
              value={passwordSignin}
              style={styles.passwordInput}
            />
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => handleSignin()}
            >
              <Text style={styles.primaryTextButton}>valider</Text>
            </TouchableOpacity>
            {errorSignin && <Text style={styles.error}>{errorSigninMess}</Text>}
          </View>
        </TouchableOpacity>
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
  buttonContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
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
  primaryButton: {
    width: 280,
    height: 53,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CC3F0C",
    borderRadius: 10,
    marginBottom: 10,
  },
  primaryTextButton: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 500,
  },
  secondaryButton: {
    width: 280,
    height: 53,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#CC3F0C",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  secondaryTextButton: {
    color: "#CC3F0C",
    fontSize: 20,
    fontWeight: 500,
  },
  error: {
    color: "red",
    fontSize: 16,
  },
});
