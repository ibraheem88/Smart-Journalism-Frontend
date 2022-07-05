import React,{ useState,useEffect } from 'react';
import { Text, View, Image, ScrollView, TextInput, Button ,Dimensions} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {connect} from "react-redux"


function NotificationScreen(props){

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
        data={props.user.notifications.reverse()}
        renderItem={({item})=>(
          <View style={{height: 70,borderBottomWidth:0.7,borderBottomColor: "black",flexDirection: "row",alignItems: "center",padding: 15}}>
          <Image source={{uri: "http://10.113.60.188:5000/upload/"+item.currentLike.image}} style={{width: 50,height: 50,borderRadius:50}}/>
          <Text style={{fontSize:18,marginLeft:10}}>{item.body}</Text>
          </View>
        )}
        />     
      </View>
    )
}

const mapState=state=>{
    return {
      user: state.user.user
    }
  }
export default connect(mapState,{})(NotificationScreen)