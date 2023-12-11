import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
} from "react-native";

export default function ConnexionScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("click");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text>Connexion Screen</Text>
      <TextInput
        placeholder="name"
        onChangeText={(value) => setName(value)}
        value={name}
      />
      <TextInput
        placeholder="email"
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <TextInput
        placeholder="password"
        onChangeText={(value) => setPassword(value)}
        value={password}
      />
      <TouchableOpacity onPress={() => handleSubmit()}>
        <Text style={styles.textButton}>submit</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
