import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

export default function SearchItem(props){
    return(
  <TouchableOpacity style={{flexDirection: "row",marginTop:10,borderBottomWidth: 1,borderColor: "grey",paddingVertical: 12,alignItems: 'center',marginBottom: 10,paddingLeft: 5}} onPress={()=>props.navigation.navigate("Map",{data: props.data})}>
        <View style={{backgroundColor: "#d4d4d4",marginRight: 10,padding: 8,borderRadius: 8}}>
        <Ionicons name="location" size={25} />
        </View>
        <Text style={{fontSize: 16}}>{props.data.city}, </Text>
        <Text style={{fontSize: 16}}>{props.data.country}</Text>
        </TouchableOpacity>
    )
}