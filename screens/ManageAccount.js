import { Button, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

export default function ManageAccountScreen({ navigation }) {
  const user = useSelector((state) => state.user);
  const token = user.credentials.token;
  return (
    <View>
      <Text>Manage Account Screen</Text>
      <Button
        title="Welcome to Manage Account"
        onPress={() => navigation.navigate("Affichage")}
      />
    </View>
  );
}
