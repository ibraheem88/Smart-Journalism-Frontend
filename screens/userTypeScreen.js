import * as React from 'react';
import { Text, View,TouchableOpacity,Image } from 'react-native';


export default function UserType(props){

  return (
    <View style={{flex:1,backgroundColor: "white"}}>
      <Image style={{flex:1,resizeMode: "cover",opacity: 0.5,backgroundColor: "#b5e2ff"}} source={{uri: "https://media.istockphoto.com/photos/female-leading-interview-with-journalists-outside-picture-id1350663727?b=1&k=20&m=1350663727&s=170667a&w=0&h=Zzw4DbVZNK-7i_U2I-9THHgNidl8dk2l4ADgB2vrwwc="}} />
      <View style={{position:"absolute",top:200,alignSelf:"center",right:0,left:0}}>
       <TouchableOpacity style={{borderWidth: 1,borderColor: "black",
        justifyContent: "center",margin: 20,borderRadius: 20,height: 50,
    alignItems: "center",padding:10}}
        onPress={()=>props.navigation.navigate("Register",{type: "consumer"})}
       >
      <Text style={{color: "black",fontSize:18}}>Register As Consumer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{borderWidth: 1,borderColor: "black",
        justifyContent: "center",margin: 20,borderRadius: 20,height: 50,
    alignItems: "center",padding:10}}
      onPress={()=>props.navigation.navigate("Register",{type: "publisher"})}
       >
      <Text style={{color: "black",fontSize:18}}>Register As Publisher</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{borderWidth: 1,borderColor: "black",
        justifyContent: "center",margin: 20,borderRadius: 20,height: 50,
    alignItems: "center",padding:10}}
      onPress={()=>props.navigation.navigate("Register",{type: "advertiser"})}
       >
      <Text style={{color: "black",fontSize:18}}>Register As an Advertiser</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}