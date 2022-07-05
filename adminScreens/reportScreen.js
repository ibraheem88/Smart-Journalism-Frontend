import React,{ useState,useEffect } from 'react';
import { TextInput, View, StyleSheet, ScrollView, Button,Image ,Text,TouchableOpacity,FlatList,RefreshControl, Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { updateUsers } from '../redux/actions';
import {connect} from "react-redux"


function ReportScreen(props){

    const [users, setUsers] = useState(props.users)
    const [reports, setReports] = useState()
    const [refreshing, setRefreshing] = useState(false);
    let user={}

    useEffect(() => {
    getReports()
    },[])
    
    const refresh=()=>{
        setRefreshing(true)
        getReports().then(() => {
          setRefreshing(false);
        });
    }

  const getReports=async()=>{
    fetch('http://10.113.60.188:5000/reports',{
      headers: {
        "Content-Type": "application/json",
      }
  }).then(
      res=>res.json())
    .then((data)=>{
        console.log(reports)
      setReports(data)
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
  data={reports}
  keyExtractor={(item)=>item._id}
  renderItem={({item})=>
      <View style={{paddingTop: 25,padding: 10,paddingLeft: 15,flexDirection: "row",justifyContent: "space-between",borderColor: "black",borderWidth: 0.5,borderTopWidth: 0}}>
  <View style={{flexDirection: "row",alignItems: "center",flex: 1}}>
  <Image source={{uri: "http://10.113.60.188:5000/upload/posts/"+item.image}} style={{width:60,height: 60,borderRadius: 50}}/>
  <View style={{flexDirection: "column",marginLeft: 10,marfinTop: 10}}>
  <Text style={{fontWeight: "bold",fontSize: 15}}>Reported By Ali</Text>
  </View>
  </View>
  <Pressable style={{borderColor: 'white',borderWidth:1,padding: 12,borderRadius: 10,justifyContent: "center",backgroundColor: "black"}} onPress={()=>props.navigation.navigate("Preview Report",{item: item})}><Text style={{color: "white"}}>Preview</Text></Pressable>
  </View>}
  
  />
    </View>
  )
}

const mapState=state=>{
  return {
    users: state.user.users
  }
}
export default connect(mapState,{})(ReportScreen)