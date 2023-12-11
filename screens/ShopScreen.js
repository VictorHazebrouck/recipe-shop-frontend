
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ShopScreen({ navigation }) {
 return (
   <View>
     <Text>Shop Screen</Text>
     <Button
       title="Go to Home"
       onPress={() => navigation.navigate('TabNavigator')}
     />
   </View>
 );
}