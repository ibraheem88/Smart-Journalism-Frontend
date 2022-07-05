import React,{ useState,useEffect } from 'react';
import { TextInput, View, StyleSheet, ScrollView, Button,Image ,Text,TouchableOpacity,FlatList,RefreshControl, Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { updateUsers } from '../redux/actions';
import {connect} from "react-redux"


function ApprovalScreen(props){

    const [users, setUsers] = useState(props.users)
    const [refreshing, setRefreshing] = useState(false);
    
    const refresh=()=>{
        setRefreshing(true)
        getUsers().then(() => {
          setRefreshing(false);
        });
    }

    const approve=(user)=>{
      fetch('http://10.113.60.188:5000/approveUser',{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          "_id": user._id
        })
      }).then((data)=>{
        const index = users.findIndex((item) => item._id === user._id)
        let updatedUser={...user,approved: true}
        users[index]=updatedUser
        setUsers([...users])}
        )
      .catch(err=>console.log(err))
    }

  const getUsers=async()=>{
    fetch('http://10.113.60.188:5000/users',{
      headers:new Headers({
          Authorization:"Bearer "+props.adminToken
      })
  }).then(
      res=>res.json())
    .then((data)=>{
      props.updateUsers(data)
      setUsers(data)
      })
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
    renderItem={({item})=>{if(item.type=='publisher')
    return(
        <View style={{paddingTop: 25,padding: 10,paddingLeft: 15,flexDirection: "row",justifyContent: "space-between",borderColor: "black",borderWidth: 0.5,borderTopWidth: 0}}>
    <View style={{flexDirection: "row",alignItems: "center",flex: 1}}>
    <Image source={{uri: "http://10.113.60.188:5000/upload/"+item.imageUri}} style={{width:60,height: 60,borderRadius: 50}}/>
    <View style={{flexDirection: "column",marginLeft: 10,marfinTop: 10}}>
    <Text style={{fontWeight: "bold",fontSize: 15}}>{item.name}</Text>
    </View>
    </View>
    {item.approved ?
    <Pressable style={{borderColor: 'black',borderWidth:1,padding: 10,borderRadius: 10,justifyContent: "center"}} onPress={()=>approve(item)}><Text>Approved</Text></Pressable>
    :
    <Pressable style={{borderColor: 'white',borderWidth:1,padding: 12,borderRadius: 10,justifyContent: "center",backgroundColor: "black"}} onPress={()=>approve(item)}><Text style={{color: "white"}}>Approve </Text></Pressable>
    }
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
export default connect(mapState,{updateUsers})(ApprovalScreen)

