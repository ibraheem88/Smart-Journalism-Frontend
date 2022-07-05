import React,{ useState,useEffect } from 'react';
import moment from 'moment'
import { Text, View,Image,ScrollView,Dimensions } from 'react-native';


export default function Article(props){


  const [advertisements, setAdvertisements] = useState(null)

  useEffect(() => {
    getAds()
    },[])

    const getAds=async()=>{
      fetch('http://10.113.60.188:5000/advertisements',{
        headers: {
          "Content-Type": "application/json",
        }
    }).then(
        res=>res.json())
      .then((data)=>{
          console.log(advertisements)
        setAdvertisements(data)
        })
      .catch(err=>console.log(err))
    }

const article=props.route.params.article
  return (
      <ScrollView style={{backgroundColor: "white"}}>
      <Text style={{fontSize:24,color: "black",fontWeight: "700",paddingHorizontal: 20,marginVertical: 30}}>{article.headline}</Text>
      <View style={{flexDirection: "row",alignItems: "center",marginHorizontal:20,marginBottom:10}}>
      <Image source={{uri: "http://10.113.60.188:5000/upload/"+article.authorImage}} style={{width: 50,height: 50,borderRadius: 40}}/>
      <Text style={{fontWeight: "600",fontSize: 15,marginLeft: 10}}>{article.authorName}</Text>
      </View>
      <Text style={{fontWeight: "400",fontSize: 14,marginHorizontal: 20}}>Published {moment(article.createdAt).fromNow()}</Text>
      <Image source={{uri: "http://10.113.60.188:5000/upload/articles/"+article.image}} style={{width: Dimensions.get('window').width,height: Dimensions.get('window').width-200,marginVertical: 30}}/>
      <Text style={{paddingHorizontal: 25,fontSize: 22,paddingVertical:20}}>{article.text}</Text>
      {advertisements &&<View style={{alignItems: "center",marginHorizontal:20,marginBottom:10}}>
      <Text style={{fontWeight: "600",fontSize: 15,marginLeft: 10}}>Advertisement</Text>
      <Image source={{uri: "http://10.113.60.188:5000/upload/advertisements/"+advertisements[0].image}} style={{width: 250,height: 250}}/>
      <Text style={{fontWeight: "600",fontSize: 15,marginLeft: 10}}>{advertisements[0].text}</Text>
      </View>}
      </ScrollView>
  )
}