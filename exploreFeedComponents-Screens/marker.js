import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Pressable,
  FlatList,
  ScrollView
} from 'react-native';
import MapView,{Marker,PROVIDER_GOOGLE} from 'react-native-maps';

export default function CustomMarker(props){
    return(
      <Marker
      coordinate={props.coordinates}
      onPress={props.onPress}
    >
    <View style={{backgroundColor: props.selected ? "black": "white",borderRadius: 20,borderWidth: 1,borderColor: "green",padding: 5}}>
    <Text style={{fontWeight: "bold",color: props.selected ? "white": "black"}}>{props.price}</Text>
    </View>
    </Marker>
    )
}