import React, { useState } from "react";
import { CheckBox } from "react-native-elements";
import { StyleSheet } from "react-native";

const MyCheckbox = ({ name = "checkbox" }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <CheckBox
      title={name}
      checked={isChecked}
      onPress={handleCheckBoxToggle}
      containerStyle={isChecked ? styles.checked : styles.unchecked}
      textStyle={isChecked ? styles.textChecked : styles.textUnchecked}
      checkedColor="#fff"
      uncheckedColor="#C9AFBD"
    />
  );
};

const styles = StyleSheet.create({
  checked: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderColor: "#4B3B47",
    backgroundColor: "#4B3B47",
  },
  unchecked: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderColor: "#C9AFBD",
    backgroundColor: "#fff",
    color: "#C9AFBD",
  },
  textChecked: {
    color: "#fff",
  },
  textUnchecked: {
    color: "#C9AFBD",
  },
});

export default MyCheckbox;
