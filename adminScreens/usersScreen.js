import React,{ useState,useEffect } from 'react';
import { TextInput, View, StyleSheet, ScrollView, Button,Image ,Text,TouchableOpacity,FlatList,RefreshControl, Pressable} from 'react-native';
import {connect} from "react-redux"
import {Ionicons} from '@expo/vector-icons'


function UsersScreen(props){

    const [users, setUsers] = useState(props.users)
    const [refreshing, setRefreshing] = useState(false);
    
    const refresh=()=>{
        setRefreshing(true)
        getUsers().then(() => {
          setRefreshing(false);
        });
    }

  const getUsers=async()=>{
    fetch('http://10.113.60.188:5000/users',{
      headers:new Headers({
          Authorization:"Bearer "+props.adminToken
      })
  }).then(
      res=>res.json())
    .then((data)=>setUsers(data))
    .catch(err=>console.log(err))
  }


    return (
      <View style={{backgroundColor: "greys",flex: 1,justifyContent: "center"}}>
              <FlatList
      refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={()=>refresh()} />
        }
    style={{backgroundColor: "white"}}
    data={users}
    keyExtractor={(item)=>item._id}
    renderItem={({item})=>{
    return(
        <View style={{paddingTop: 25,padding: 10,paddingLeft: 15,flexDirection: "row",justifyContent: "space-between",borderColor: "black",borderWidth: 0.5,borderTopWidth: 0}}>
    <View style={{flexDirection: "row",alignItems: "center",flex: 1}}>
    <Image source={{uri: "http://10.113.60.188:5000/upload/"+item.imageUri}} style={{width:60,height: 60,borderRadius: 50}}/>
    <View style={{flexDirection: "column",marginLeft: 10,marfinTop: 10}}>
    <Text style={{fontWeight: "bold",fontSize: 15}}>{item.name}</Text>
    </View>
    </View>
    <Pressable style={{borderColor: 'black',borderWidth:1,padding: 10,borderRadius: 10,justifyContent: "center",marginRight:10,backgroundColor: "black"}}><Text style={{color: "white"}}>Block</Text></Pressable>
    <Pressable style={{borderColor: 'black',borderWidth:1,padding: 10,borderRadius: 10,justifyContent: "center",backgroundColor: "red"}}><Text style={{color: "white"}}>Delete</Text></Pressable>
    </View>)
    }}
    />
      </View>
    )
}

const mapState=state=>{
  return {
    users: state.user.users,
    adminToken: state.user.adminToken
  }
}
export default connect(mapState)(UsersScreen)