import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState, useEffect } from "react";

const screenWidth = Dimensions.get("window").width;

const SearchBar = ({
  onInputChange,
  minChar = 3,
  placeholder = "Write here",
  debounceTimer = 200,
}) => {
  const [input, setInput] = useState("");

  //Avoids too many calls on backend & db
  useEffect(() => {
    //wait for x milliseconds before sending input value to parent
    const timeoutId = setTimeout(async () => {
      //don't send input value to parent if length < x
      if (input.length === 0) onInputChange("");
      if (input.length < minChar) return;
      await onInputChange(input);
    }, debounceTimer);

    //reset this timer on component rerender (on input change)
    return () => clearTimeout(timeoutId);
  }, [input]);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#937B8A"
        onChangeText={(value) => setInput(value)}
        value={input}
      />
      <TouchableOpacity onPress={() => setInput("")} activeOpacity={1}>
        <FontAwesome name={"close"} size={23} style={styles.erase} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 42,
    flex: 10,
  },
  input: {
    height: 42,
    flex: 1,
  },
  erase: {
    color: "#937B8A",
  },
});

export default SearchBar;
