import { Button, StyleSheet, Text, View } from 'react-native';

export default function ManageAccountScreen({ navigation }) {
 return (
   <View>
     <Text>Manage Account Screen</Text>
     <Button
       title="Welcome to Manage Account"
       onPress={() => navigation.navigate('Affichage')}
     />
   </View>
 );
}