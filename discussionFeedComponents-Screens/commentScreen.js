import React,{useEffect,useState} from 'react';
import { Text, View,KeyboardAvoidingView,FlatList,TextInput,TouchableOpacity,Image} from 'react-native';
import { Ionicons, Entypo} from '@expo/vector-icons';
import moment from 'moment'
export default function Comments(props){

  useEffect(() => { 

  }, [])

  const [comment, setComment] = useState('')
  const [comments,setComments]= useState(props.route.params.post.comments)

  const postComment=async ()=>{
    fetch('http://10.113.60.188:5000/newComment',{
      method: "POST",
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        "text": comment,
        "authorName": props.route.params.user.name,
        "authorImage": props.route.params.user.imageUri,
        "postedBy": props.route.params.user._id,
        "postId": props.route.params.post._id
      })
    }).then(
      res=>res.json())
    .then((data)=>{console.log(data)
    setComment("")
    })
    .catch(err=>console.log(err))
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={70}
    style={{flex: 1,backgroundColor: "white"}}>
      {comments.length!=0 ?
      <FlatList
        style={{backgroundColor: "white"}}
        data={comments}
        keyExtractor={(item,index)=>index.toString()}
        renderItem={({item})=>
        <View style={{flexDirection: "row",padding: 15}}>
        <Image source={{uri: "http://10.113.60.188:5000/upload/"+item.authorImage}} style={{width:40,height: 40,borderRadius: 50}}/>
        <View style={{flexDirection: "column",marginLeft: 10,marfinTop: 10}}>
        <Text style={{fontSize: 15}}>{item.text}</Text>
        <Text style={{fontSize: 12,color: "grey"}}>{moment(item.createdAt).fromNow()}</Text>
        </View>
        </View>}
      /> :
      <View style={{flex:1,alignSelf:"center",justifyContent: "center"}}>
      <Text style={{fontSize: 18,color: "grey"}}>No Comments Yet!</Text>
      </View>
}
       <View style={{flexDirection: "row",alignItems: "center",bottom: 20,marginTop: 10,backgroundColor: "white"}}>
    <View style={{width: "60%",flex:1,borderColor: "black",borderWidth: 1,borderRadius:45,marginHorizontal: 10,backgroundColor: "white",flexDirection: 'row',alignItems: 'center'}}>
  <TextInput style={{flex:1,paddingLeft:10,paddingTop:10,height:40,alignItems: "center"}} multiline value={comment} onChangeText={(value)=>setComment(value)}
  />
    </View>
    <Ionicons
    name="send"
    size={28}
    style={{paddingRight:10}}
    onPress={()=>postComment()}
    color="black"/>
    </View>
    </KeyboardAvoidingView>
  )
}