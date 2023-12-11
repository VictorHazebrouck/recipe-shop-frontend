import { Button, StyleSheet, Text, View } from 'react-native';

export default function AffichageScreen({ navigation }) {
 return (
   <View>
     <Text>Affichage Screen</Text>
     <Button
       title="Welcome to Magasin favori"
       onPress={() => navigation.navigate('FavStore')}
     />
   </View>
 );
}