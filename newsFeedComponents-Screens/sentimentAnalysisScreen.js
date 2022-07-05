import React,{ useState,useEffect} from 'react';
import { Text, View,TouchableOpacity,ActivityIndicator,Image } from 'react-native';


export default function SentimentAnalysisScreen(props){

  const [prediction, setPrediction] = useState("No Analysis")
  const [indicator, setIndicator] = useState(false)

  const performSentimentAnalysis=(user)=>{
    setIndicator(true)
    const comments=props.route.params.post.comments.map(comment=>comment.text)
    fetch('http://10.113.60.188:5000/sentiment',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "comments": comments.join()
    })
    }).then(
      res=>res.json())
      .then((data)=>{
      setPrediction(data)
    setIndicator(false)}
      )
    .catch(err=>console.log(err))
  }

  return (
    <View style={{flex:1,backgroundColor: "white"}}>
        <Image style={{flex:1,resizeMode: "cover",opacity: 0.5,backgroundColor: "#b5e2ff"}} resizeMode="contain" source={{uri: "https://d3caycb064h6u1.cloudfront.net/wp-content/uploads/2021/12/1.jpeg"}} />
        <TouchableOpacity style={{borderColor: "black",borderWidth:1,alignSelf: "center",padding:10,borderRadius:6,position: "absolute",top:50}}
        onPress={()=>performSentimentAnalysis()}>
          <Text style={{fontSize:18}}>Perform Sentiment Analysis</Text>
        </TouchableOpacity>
        <View style={{flex:1,top: 215,alignSelf: "center",position: "absolute"}}>
        {indicator ? <ActivityIndicator size={'large'} color={'black'}/> :
        <Text style={{fontSize:28,color: "black",fontWeight: "600"}}>{prediction}</Text>}
        </View>
    </View>
  )
}