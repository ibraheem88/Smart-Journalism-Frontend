import React,{ useState,useEffect } from 'react'
import {View,Text,Image} from 'react-native'
import Pusher from 'pusher-js/react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

let channel={}
export default function ChatListItem(props){

  const [lastMessage, setlastMessage] = useState('');

  useEffect(() => {
      getLastMessage()
      const pusher = new Pusher('320c6db0db0698904fd9', {
        cluster: 'us2'
      });
      
      channel = pusher.subscribe('chatrooms');
      channel.bind('update', (data)=> {
        if(data.updated.lastMessage){
          getLastMessage()
        }})
        channel.bind('insert', (data)=> {
          if(data.lastMessage){
            getLastMessage()
          }
        })

        return () => {
          channel.unbind_all()
          channel.unsubscribe()
      }
    },[])


   const getLastMessage=async ()=>{
      const chatRoomId=props.currentUser._id > props.chatRoom._id ? props.currentUser._id+'-'+props.chatRoom._id : props.chatRoom._id+'-'+props.currentUser._id
          fetch('http://10.113.60.188:5000/lastMessage',{
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
          },
            body: JSON.stringify({
              "chatRoomId": chatRoomId
            })
          }).then(
            res=>res.json())
          .then((data)=>{
            if(data)setlastMessage(data)}
            )
          .catch(err=>console.log(err))
        }

    return(
        <TouchableOpacity style={{paddingTop: 25,padding: 10,paddingLeft: 15,flexDirection: "row",justifyContent: "space-between",borderBottomColor: "black",borderBottomWidth: 0.5}}
        onPress={()=>props.navigation.navigate('ChatRoom',{chatRoom: props.chatRoom,currentUser: props.currentUser})}>
        <View style={{flexDirection: "row"}}>
        <Image source={{uri: "http://10.113.60.188:5000/upload/"+props.chatRoom.imageUri}} style={{width:60,height: 60,borderRadius: 50}}/>
        <View style={{flexDirection: "column",marginLeft: 10,marfinTop: 10}}>
        <Text style={{fontWeight: "bold",fontSize: 15}}>{props.chatRoom.name}</Text>
        <Text style={{fontSize: 15,color: "grey"}}>{lastMessage}</Text>
        </View>
        </View>

        </TouchableOpacity>
    )
}