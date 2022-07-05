import React,{ useState,useEffect } from 'react';
import { Text, View, Image, ScrollView, TextInput, Button ,Dimensions} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {connect} from "react-redux"


function AdvertisementsScreen(props){

    useEffect(() => {
        
      },[])

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Text>Advertisements</Text>
          
      </View>
    )
}

const mapState=state=>{
    return {
      user: state.user.user
    }
  }
export default connect(mapState,{})(AdvertisementsScreen)