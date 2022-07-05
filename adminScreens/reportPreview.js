import React,{ useState,useEffect } from 'react';
import { TextInput, View, StyleSheet, ScrollView, Button,Image ,Text,TouchableOpacity,FlatList,RefreshControl, Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { updateUsers } from '../redux/actions';
import {connect} from "react-redux"


function ReportPreview(props){

  return (
    <View style={{backgroundColor: "greys",flex: 1,justifyContent: "center",alignItems: "center"}}>
  <Image source={{uri: "http://10.113.60.188:5000/upload/posts/"+props.route.params.item.image}} style={{width:300,height: 300}}/>
  <Text style={{fontWeight: "bold",fontSize: 15,marginTop:20}}>{props.route.params.item.forgery}</Text>
  <Pressable style={{borderColor: 'white',borderWidth:1,padding: 12,borderRadius: 10,justifyContent: "center",backgroundColor: "black",marginTop:20}} onPress={()=>props.navigation.navigate("Preview Report",{item: item})}><Text style={{color: "white"}}>Delete Post</Text></Pressable>
    </View>
  )
}

const mapState=state=>{
  return {
    users: state.user.users
  }
}
export default connect(mapState,{})(ReportPreview)