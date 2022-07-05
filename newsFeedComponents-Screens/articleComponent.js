import React,{ useEffect } from 'react';
import { Text, View,Image,Dimensions, Pressable } from 'react-native';


export default function Article(props){
  return (
      <Pressable style={{paddingVertical: 35,backgroundColor:"black",paddingBottom:10}} onPress={()=>props.navigation.navigate("Article",{article:props.article})}>
        <Image source={{uri: "http://10.113.60.188:5000/upload/articles/"+props.article.image}} style={{width: Dimensions.get('window').width,height: Dimensions.get('window').width-200}}/>
        <Text style={{ fontSize: 25, fontWeight: '500',paddingLeft:10,paddingTop:10,color: "white"}}>{props.article.headline}</Text>
        <Text style={{ fontSize: 19, fontWeight: '400',paddingLeft:10,paddingTop:10,color: "white"}} numberOfLines={2}>{props.article.text}</Text>
        <View style={{flexDirection: "row",alignItems: "center",marginHorizontal:10,marginVertical:10}}>
            <Image source={{uri: "http://10.113.60.188:5000/upload/"+props.article.authorImage}} style={{width: 40,height: 40,borderRadius: 40}}/>
            <Text style={{fontWeight: "600",fontSize: 15,marginLeft: 10,color: "white"}}>By {props.article.authorName}</Text>
        </View>
      </Pressable>
  )
}