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
import ROUTE from "../globals/nico";
import { useDispatch } from "react-redux";
import { initUser, setLogin } from "../reducers/user";
import LargeButton from "../components/LargeButton";

export default function ConnexionScreen({ navigation }) {
  const dispatch = useDispatch();

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

    fetch(`${ROUTE}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(initUser(data.newUser));
          resetState();
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

    fetch(`${ROUTE}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(initUser(data.response));
          dispatch(setLogin())
          resetState();
          navigation.navigate("TabNavigator");
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
        <LargeButton
          name="sign in"
          isPlain={true}
          onPress={openModalSignin}
          styleButton={{ marginBottom: 16 }}
        />
        <LargeButton name="sign up" onPress={openModalSignup} />
      </View>
      {/* modal signup */}
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
            <LargeButton name="valider" isPlain={true} onPress={handleSignup} />
            {errorSignup && <Text style={styles.error}>{errorSignupMess}</Text>}
          </View>
        </TouchableOpacity>
      </Modal>
      {/* modal signin */}
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
            <LargeButton name="valider" isPlain={true} onPress={handleSignin} />
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
    padding: 20,
    borderRadius: 6,
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
    // uninstall npx react-native-asset ?
    // fontFamily: "Anton Regular",
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
  error: {
    color: "red",
    fontSize: 16,
  },
});
