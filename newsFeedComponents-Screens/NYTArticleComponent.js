import React,{ useEffect ,memo} from 'react';
import { Text, View,Image,Dimensions, Pressable} from 'react-native';


function NYTArticle(props){
  return (
      <Pressable style={{backgroundColor: "black",paddingVertical: 35,borderBottomColor:'white',borderBottomWidth:5,paddingBottom:10}} onPress={()=>props.navigation.navigate("NYTArticle",{article:props.article})}>
        <Image source={{uri: props.article.urlToImage}} style={{width: Dimensions.get('window').width-20,height: Dimensions.get('window').width-200,alignSelf:"center",borderRadius:7}}/>
        <Text style={{ fontSize: 25, fontWeight: '500',paddingLeft:10,paddingTop:10,color: "white"}}>{props.article.title}</Text>
        <Text style={{ fontSize: 19, fontWeight: '400',paddingLeft:10,paddingTop:10,color: "white"}} numberOfLines={2}>{props.article.description}</Text>
        <View style={{flexDirection: "row",alignItems: "center",marginHorizontal:10,marginVertical:10}}>
            <Image source={{uri: props.article.urlToImage}} style={{width: 40,height: 40,borderRadius: 40}}/>
            <Text style={{fontWeight: "600",fontSize: 15,marginLeft: 10,color: "white"}}>By {props.article.author}</Text>
        </View>
      </Pressable>
  )
}

export default memo(NYTArticle)