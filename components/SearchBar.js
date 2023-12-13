import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';


const SearchBar = ({ onInputChange, minChar = 3, placeholder = "Write here", debounceTimer = 200, }) => {
    const [input, setInput] = useState('')

    //Avoids too many calls on backend & db
    useEffect(() => {
        //don't send input value to parent if length < x 
        if (input.length < minChar) return

        //wait for x milliseconds before sending input value to parent
        const timeoutId = setTimeout(async () => {
            await onInputChange(input)
        }, debounceTimer);

        //reset this timer on component rerender (on input change)
        return () => clearTimeout(timeoutId)
    }, [input])

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="gray"
                onChangeText={(value) => setInput(value)}
                value={input}
            />
            <TouchableOpacity onPress={() => setInput("")} activeOpacity={1}>
                <FontAwesome name={"close"} size={23} color='gray' />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderWidth: 1,
        borderColor: '#D3D3D3',
        height: 40,
        flex: 1,
        borderRadius: "50%",
        paddingHorizontal: 15,
    },
    input: {
        flex: 1,
    },
});

export default SearchBar;