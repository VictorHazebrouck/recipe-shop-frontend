import { Button, StyleSheet, Text, View } from 'react-native';

export default function GoutsScreen({ navigation }) {
 return (
   <View>
     <Text>Gouts Screen</Text>
     <Button
       title="Welcome to Affichage"
       onPress={() => navigation.navigate('Affichage')}
     />
   </View>
 );
}