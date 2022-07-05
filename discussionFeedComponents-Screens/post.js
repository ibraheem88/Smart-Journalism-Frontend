import React,{ useState,useEffect} from 'react';
import {View} from 'react-native';
import ProfilePhoto from "./profilePhoto"
import Header from "./postHeader"
import Body from "./postBody"
import Footer from "./postFooter"


export default function Post(props){

  return (
    <View>
    <Header post={props.post} user={props.user} navigation={props.navigation} users={props.users}/>
    <Body post={props.post} navigation={props.navigation}/>
    <Footer post={props.post} navigation={props.navigation} user={props.user} users={props.users} key={JSON.stringify(props.post)}/>
    </View>
  )
}