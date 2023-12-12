import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

const Button = () => {
  const [focus, setFocus] = useState("");

  // onclick
  const handleClick = (data) => {
    console.log("click");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={() => handleClick}>
      <Text style={styles.textButton}>Button</Text>
    </TouchableOpacity>
  );
};

const defaultStyles = StyleSheet.create({
  button: {
    backgroundColor: "#CC3F0C",
  },
  textButton: {
    color: "#fff",
  },
});

export default Button;
