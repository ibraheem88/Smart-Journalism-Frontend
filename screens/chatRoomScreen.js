import React,{ useState,useEffect} from 'react';
import { Text,View, ImageBackground, FlatList,TextInput, TouchableOpacity, KeyboardAvoidingView,Platform} from 'react-native';
import Chats from "../assets/chats"
import ChatMessage from '../components/chatMessage';
import Pusher from 'pusher-js/react-native'
import * as DocumentPicker from 'expo-document-picker';
import BG from '../assets/bg.png'
import * as FileSystem from 'expo-file-system'
import * as Notifications from 'expo-notifications';
import { Ionicons, Entypo} from '@expo/vector-icons';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

let channel={}
let chatRoomId=null
export default function ChatRoomScreen(props){

  const [message, setMessage] = useState('')
  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState([])
  const [userName, setUserName] = useState('')
  const [documentBlob, setDocumentBlob] = useState('')

  useEffect(() => {
    chatRoomId=props.route.params.currentUser._id > props.route.params.chatRoom._id ? props.route.params.currentUser._id+'-'+props.route.params.chatRoom._id : props.route.params.chatRoom._id+'-'+props.route.params.currentUser._id
    getMessages()
    const pusher = new Pusher('320c6db0db0698904fd9', {
      cluster: 'us2'
    });
    
    channel = pusher.subscribe('chatrooms');
    channel.bind('update', (data)=> {
      const keys = Object.keys(data.updated)
      const message=keys[1]
      if(data.updated[message]){
        setMessages(messages=>[...messages,data.updated[message]])
      }
    })
    channel.bind('insert', (data)=> {
      if(data.messages){
        setMessages(data.messages)
      }
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
  }

  },[])
  
 const sendPushNotification=async (message)=>{
    fetch("https://exp.host/--/api/v2/push/send",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: props.route.params.chatRoom.token,
        sound: 'default',
        title: props.route.params.currentUser.name+" sent a message",
        body: message
      })
    }).then(
      res=>res.json())
    .catch(err=>console.log(err))
  }

  const getMessages=async ()=>{
        fetch('http://10.113.60.188:5000/messages',{
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
          if(data)setMessages(data.messages)}
          )
        .catch(err=>console.log(err))
      }

  const sendMessage=async ()=>{
    fetch('http://10.113.60.188:5000/newMessage',{
      method: "POST",
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        "message": message,
        "sentBy": props.route.params.currentUser._id,
        "sentTo": props.route.params.chatRoom._id,
        "type": "text",
        "chatRoomId": chatRoomId
      })
    }).then(
      res=>res.json())
    .then((data)=>{console.log(data)
    sendPushNotification(message)
    setMessage("")})
    .catch(err=>console.log(err))
  }
  


 const handleSend=()=>{
    if(message){
      sendMessage()
    }
    else{
      console.warn("Microphone")
    }
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={60}>
    <ImageBackground style={{width: '100%',height: '100%'}} source={{uri: "https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg"}}>
    <FlatList
    inverted={-1}
    contentContainerStyle={{ flexDirection: 'column-reverse' }}
    data={messages}
    renderItem={({item})=><ChatMessage message={item} currentUser={props.route.params.currentUser._id}/>}
    keyExtractor={(item,index)=>index.toString()}
    />
    <View style={{paddingBottom: 8,flexDirection: "row",marginTop: 0}}>
    <View style={{width: "78%",flex: 1,borderRadius:45,marginHorizontal: 10,backgroundColor: "white",padding: 10,flexDirection: 'row',alignItems: 'center'}}>
    <Ionicons
    style={{paddingLeft: 10}}
    name="happy-outline"
    size={30}
    color="grey"
  />
  <TextInput style={{flex: 1,paddingLeft: 10}} multiline value={message} onChangeText={(value)=>setMessage(value)}/>
    {!message && <Ionicons
    onPress={()=>props.navigation.navigate("Send Image",{messages: messages,chatRoomId: chatRoomId,sentBy:props.route.params.currentUser._id,sentTo: props.route.params.chatRoom._id })}
    name="camera"
    size={30}
    color="grey"
  />}
  <Entypo
    style={{paddingLeft: 10,paddingRight: 5 }}
    onPress={()=>getDocument()}
    name="attachment"
    size={25}
    color="grey"
  />
    </View>
    <TouchableOpacity style={{backgroundColor: "#0C6157",justifyContent: "center",height: 60,width: '15%',borderRadius: 50,alignItems: "center",marginRight: 8}} onPress={()=>handleSend()}>
    {message ?
    <Ionicons
    name="send"
    size={24}
    color="white"/> :
    <Ionicons
    name="mic"
    size={25}
    color="white"/>
    }
  
    </TouchableOpacity>
    </View>
    </ImageBackground>
    </KeyboardAvoidingView>
  )
}
