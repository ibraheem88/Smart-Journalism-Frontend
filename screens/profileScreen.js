import React,{ useState,useEffect} from 'react';
import { Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {connect} from "react-redux"
import {View, StyleSheet,Text,FlatList,RefreshControl,Platform,TouchableOpacity, Image,ScrollView} from 'react-native';
import Post from "../discussionFeedComponents-Screens/post"


function ProfileScreen(props){

  const [user, setUser] = useState(props.user)

    return (
      <View>
      <View style={{borderBottomColor:"grey",paddingVertical: 15,borderBottomWidth: 1}}>
      <Image source={{uri: "http://10.113.60.188:5000/upload/"+user.imageUri}} style={{width:150,height: 150,borderRadius: 75,alignSelf: "center",resizeMode: "cover"}}/>
      <TouchableOpacity
          style={{width: 100,
              borderWidth: 1,
              justifyContent: "center",
              alignSelf: "center",
              margin: 5,
              borderRadius: 5,
              height: 50,
              marginTop: 35}}
              onPress={()=>props.navigation.navigate("SettingScreen",{user: user})}
          >
          <Text style={{alignSelf: "center"}}>Edit Profile</Text>
      </TouchableOpacity>
      </View>
      <View style={{padding:15}}>
      <View style={{flexDirection: "row",alignItems: "center",marginBottom:20}}>
      <Ionicons name={'person-outline'} size={20} color="black" />
      <Text style={{color: "black",fontWeight:"500",fontSize:18,marginLeft:15}}>{user.name}</Text>
      </View>
      <View style={{flexDirection: "row",alignItems: "center",marginBottom:20}}>
      <Ionicons name={'briefcase-outline'} size={20} color="black" />
      <Text style={{color: "black",fontWeight:"500",fontSize:18,marginLeft:15}}>Works At Sky News</Text>
      </View>
      <View style={{flexDirection: "row",alignItems: "center",marginBottom:20}}>
      <Ionicons name={'school-outline'} size={20} color="black" />
      <Text style={{color: "black",fontWeight:"500",fontSize:18,marginLeft:15}}>Studied at King Martin University</Text>
      </View>
      <View style={{flexDirection: "row",alignItems: "center",marginBottom:20}}>
      <Ionicons name={'location-outline'} size={20} color="black" />
      <Text style={{color: "black",fontWeight:"500",fontSize:18,marginLeft:15}}>From Sydney</Text>
      </View>
      </View>
      <View
      style={{
        padding: 20,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
      }}>
      <Text style={{ fontSize: 15, fontWeight: '500' }}>Add Location</Text>
    </View>
    </View>
    );
  }

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    width: '50%',
    borderColor: "black",
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 2,
    marginVertical: 20
  }
});

const mapState=state=>{
  return {
    user: state.user.user
  }
}
export default connect(mapState)(ProfileScreen)