import * as React from 'react';
import moment from 'moment'
import { Text, View, StyleSheet,ImageBackground,Dimensions,TouchableOpacity,TextInput,Pressable,Image,ScrollView} from 'react-native';

export default function PostItem(props){
  return(
    <Pressable style={{height: 120,padding: 5,width: Dimensions.get("window").width-60,shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.30,
shadowRadius: 4.65,

elevation: 8}} >
    <View style={{flexDirection: 'row',backgroundColor: "white",borderRadius: 10,overflow: "hidden"}}>
      <Image source={{uri: "http://10.113.60.188:5000/upload/posts/"+props.feed.image}} style={{height: "100%",aspectRatio: 1}} />
      <View style={{marginHorizontal: 10,flex: 1,marginVertical: 10}}>
  <Text style={{color: "grey",fontSize: 15}}>{props.feed.headline}</Text>
  <Text style={{fontSize: 15,paddingTop: 10}} numberOfLines={2}>About {moment(props.feed.createdAt).fromNow()}</Text>
  <Text style={{paddingTop: 10,fontWeight: "bold",fontSize: 15}}>By {props.feed.authorName}</Text>
  </View>
  </View>
    </Pressable>
  )
}