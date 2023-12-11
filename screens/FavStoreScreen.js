import { Button, StyleSheet, Text, View } from 'react-native';

export default function FavStoreScreen({ navigation }) {
 return (
   <View>
     <Text>FavStore Screen</Text>
     <Button
       title="Welcome to Magasin favori"
       onPress={() => navigation.navigate('TabNavigator')}
     />
   </View>
 );
}