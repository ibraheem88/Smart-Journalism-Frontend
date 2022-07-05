import React,{ useState,useEffect } from 'react';
import { TextInput, View, StyleSheet, ScrollView, Button,Image ,Text,TouchableOpacity,FlatList,RefreshControl, Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { updateUsers } from '../redux/actions';
import {connect} from "react-redux"


function PaymentScreen(props){

    const [users, setUsers] = useState(props.users)
    const [payments, setPayments] = useState(props.users)
    const [refreshing, setRefreshing] = useState(false);
    let user={}

    useEffect(() => {
    getPayments()
    },[])
    
    const refresh=()=>{
        setRefreshing(true)
        getPayments().then(() => {
          setRefreshing(false);
        });
    }

  const getPayments=async()=>{
    fetch('http://10.113.60.188:5000/payments',{
      headers: {
        "Content-Type": "application/json",
      }
  }).then(
      res=>res.json())
    .then((data)=>{
      setPayments(data)
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
    data={payments}
    keyExtractor={(item)=>item._id}
    renderItem={({item})=>{user=users.find((user)=>user._id==item.userId)
    if(user){
    return(
        <Pressable style={{paddingTop: 25,padding: 10,paddingLeft: 15,flexDirection: "row",justifyContent: "space-between",borderColor: "black",borderWidth: 0.5,borderTopWidth: 0}}
        onPress={()=>props.navigation.navigate("PaymentHistory",{users: users,item: item})}>
    <View style={{flexDirection: "row",alignItems: "center",flex: 1}}>
    <Image source={{uri: "http://10.113.60.188:5000/upload/"+user.imageUri}} style={{width:60,height: 60,borderRadius: 50}}/>
    <View style={{flexDirection: "column",marginLeft: 10,marfinTop: 10}}>
    <Text style={{fontSize: 15}}>{user.name}</Text>
    </View>
    <View style={{flexDirection: "column",marginLeft: 20,marginTop: 5}}>
    <Text style={{fontWeight: "500",fontSize: 15}}>{item.amount} {item.currency}</Text>
    <Text style={{fontSize: 15}}>{item.card}</Text>
    </View>
    </View>
    {item.status=="Succeeded" ?
    <Pressable style={{borderColor: 'white',borderWidth:1,padding: 10,borderRadius: 10,justifyContent: "center",backgroundColor: "green"}} onPress={()=>approve(item)}><Text style={{color: "white"}}>Succeeded</Text></Pressable>
    :
    <Pressable style={{borderColor: 'white',borderWidth:1,padding: 12,borderRadius: 10,justifyContent: "center",backgroundColor: "red"}} onPress={()=>approve(item)}><Text style={{color: "white"}}>Pending</Text></Pressable>
    }
    </Pressable>)}
    }}
    />
      </View>
    )
}

const mapState=state=>{
  return {
    users: state.user.users
  }
}
export default connect(mapState,{})(PaymentScreen)