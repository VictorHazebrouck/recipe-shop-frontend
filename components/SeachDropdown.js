import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';


const SearchDropdown = ({ onInputChange, onResultSelection, minChar = 3, maxResults, placeholder, debounceTimer = 200, inputStyle = {}, resultsStyle = {}, }) => {
    const styles = mergeStyles(defaultStyles, inputStyle, resultsStyle)
    if (!inputStyle.height) inputStyle.height = 50
    const [input, setInput] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [list, setList] = useState([])
    let searchSuggestions = []

    //on Input change, send Input value to parent after no change for x ms since last keystroke, receive computed Array. 
    //map over items provided by parent to save data within components,
    //and display only their values from "_searchName" key in suggestions.
    useEffect(() => {
        if (input.length === 0) setIsVisible(false)
        if (input.length < minChar) { setList([]); setIsVisible(false); return }

        const timeoutId = setTimeout(async () => {
            const data = await onInputChange(input)
            if (maxResults) data.splice(maxResults)
            setList(data)
            setIsVisible(true)
        }, debounceTimer);

        return () => clearTimeout(timeoutId)
    }, [input])

    //on Click on a suggestion item, send data specific to this element back to parent, reset stuff. 
    const handleClick = (data) => {
        setInput('')
        setIsVisible(false)
        Keyboard.dismiss()
        onResultSelection(data)
    }

    searchSuggestions = list.map((e, i) => {
        return (
            <TouchableOpacity onPress={() => handleClick(e)} style={styles.results} activeOpacity={1} key={i}>
                <Text>{e._searchName}</Text>
            </TouchableOpacity>)
    })

    return (
        <View style={[styles.container, { height: inputStyle.height }]}>
            <View style={[styles.inputContainer, { height: inputStyle.height }]}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    onChangeText={(value) => setInput(value)}
                    value={input}
                />
                <TouchableOpacity onPress={() => setIsVisible(!isVisible)} activeOpacity={1}>
                    <FontAwesome name={isVisible ? "chevron-up" : "chevron-down"} size={20} color='gray' />
                </TouchableOpacity>
            </View>
            <View style={styles.resultsContainer}>
                {isVisible && searchSuggestions}
            </View>
        </View>
    );
};

const mergeStyles = (baseStyles, inputStyle, resultsStyle) => {
    const mergedStyles = { ...baseStyles };
    if (inputStyle) mergedStyles.inputContainer = { ...baseStyles.inputContainer, ...inputStyle };
    if (resultsStyle) mergedStyles.results = { ...baseStyles.results, ...resultsStyle };
    return StyleSheet.create(mergedStyles)
};

const defaultStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        zIndex: 2,
        width: '100%'
    },
    inputContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius: 4,
        marginBottom: 3,
        borderWidth: 1,
        borderColor: '#D3D3D3',
    },
    resultsContainer: {
        borderRadius: 4,
        overflow: "hidden",
    },
    input: {
        flex: 1,
    },
    results: {
        justifyContent: 'center',
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'gray',
        borderBottomWidth: 1,
        paddingLeft: 20,
        fontSize: 25,
        activeOpacity: 1,
    }
});

export default SearchDropdown;