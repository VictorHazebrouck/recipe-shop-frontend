import { Button, StyleSheet, Text, View } from 'react-native';

export default function PlanningScreen({ navigation }) {
 return (
   <View>
     <Text>Affichage Screen</Text>
     <Button
       title="Welcome to Affichage"
       onPress={() => navigation.navigate('FavStore')}
     />
   </View>
 );
}