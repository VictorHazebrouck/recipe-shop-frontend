import { Button, StyleSheet, Text, View, Image } from 'react-native';

export default function RegimeScreen({ navigation }) {
 return (
    <View style={styles.container}>      
        <View style={styles.imageWrapper}>
            <Image style={styles.imageBackground} source={require('../assets/splash.png')} />
            <Text>Regime Screen</Text>
        </View>

     <Button
       title="Suivant"
       onPress={() => navigation.navigate('Gouts')}
     />
   </View>
 );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imageWrapper: {
        height: '80%',
        backgroundColor: '#655074',
        border: 'none',
      },
});