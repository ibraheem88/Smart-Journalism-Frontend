import * as React from 'react';
import { Text,ScrollView, View,StyleSheet, Pressable,Dimensions,TextInput,TouchableOpacity,ImageBackground} from 'react-native';
import { Ionicons} from '@expo/vector-icons';
import Constants from 'expo-constants';
import GeoDBCitiesSearch from 'react-native-geodb';
import SearchItem from "./searchItem"

export default function SearchArticle(props){
  return(
    <View style={{flex:1,backgroundColor: "white"}}>
      <View style={{width:'100%',height:'15%',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
        <Ionicons name="search-sharp"
           size={19}
            color="gray"
            style={{ position: 'absolute', left: '6%', zIndex: 1 }}
        />
        <TextInput
          style={{width:'76%',height:'70%',borderRadius: 8,backgroundColor:'#ECECEC',paddingLeft:'8%',fontSize: 16}}
                placeholder="Search"
                placeholderTextColor="gray"
        />
        <TouchableOpacity style={{ marginLeft: '4%' }}>
          <Text
            style={{ fontSize: 15, fontWeight: '500' }}
            onPress={() => navigation.pop()}>
              Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
  imageText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white"
  },
  imageBackground: {
    height:180,
    width:180,
    padding:10,
    marginLeft:30
  },
  imageStyle: {
    borderRadius: 5
  },
  imageContainer: {
    paddingHorizontal:10,
    flexDirection: "row",
    marginTop:10,
    justifyContent: "center"
  }
});
