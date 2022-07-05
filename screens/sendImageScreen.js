import React,{ useState,useEffect} from 'react';
import { Text, View, StyleSheet,Image,TouchableOpacity,TextInput,KeyboardAvoidingView,Platform } from 'react-native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, Entypo} from '@expo/vector-icons';



export default function SendImage(props){

  const [image, setImage] = useState("file:///var/mobile/Containers/Data/Application/3279888D-49E8-48E9-8736-DA2D71321EA4/Library/Caches/ExponentExperienceData/%2540ibraheem_88%252Fc9fd9e/ImagePicker/DED89785-7441-4EEE-9645-04C70112F617.jpg")
  const [caption, setCaption] = useState("")
  const [imageFile, setImageFile] = useState('')

  const handleCaption=(caption)=>{
      setCaption(caption)
  }

 const getGallery=async()=>{
    const cameraRoll = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
    })
    setImage(cameraRoll.uri)
    const response=await fetch(cameraRoll.uri)
    const blob=await response.blob()
    const file = {
        uri: cameraRoll.uri,
        name: blob['_data'].name,
        type: blob['_data'].type
      }
    setImageFile(file)
}

const sendMessage=async()=>{
    const data = new FormData();
    data.append('message', caption)
    data.append('image', imageFile)
    data.append('sentBy', props.route.params.sentBy)
    data.append('sentTo', props.route.params.sentTo)
    data.append('chatRoomId', props.route.params.chatRoomId)
    data.append('type', "image")
    fetch('http://10.113.60.188:5000/sendImage',{
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: data
    }).then(
        ()=>{console.log("Image Sent")
    props.navigation.goBack()}
    ).catch(err=>console.log(err))
}

  const handleSend=()=>{
    if(image){
      sendMessage()
    }
    else{
        console.log(image)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <View style={{flex: 1,height:'15%',paddingHorizontal: 10,flexDirection: 'row'}}>
    <Ionicons
    onPress={()=>props.navigation.goBack()}
    name="close-outline"
    size={35}
    color="white"/>
    </View>
    <Image resizeMode={"cover"} source={{uri: image}} style={{width: "100%",height: "70%"}}/>
    <View style={{flex: 1,height:'15%',padding: 10,flexDirection: 'row',alignItems: "center"}}>
    <TouchableOpacity style={{backgroundColor: "grey",justifyContent: "center",height: 40,width: '10%',borderRadius: 30,alignItems: "center",marginRight: 6}} onPress={()=>getGallery()}>
    <Ionicons
    name="add-circle"
    size={22}
    color="white"/>
    </TouchableOpacity>
  <TextInput style={{flex: 1,height: 40,paddingLeft: 10,backgroundColor: "white",borderRadius:40,fontSize: 13}} value={caption} onChangeText={(caption)=>handleCaption(caption)} placeholder={"Add a caption"} placeholderTextColor={"grey"}/>
    <TouchableOpacity style={{backgroundColor: "#1184e8",justifyContent: "center",height: 40,width: '10%',borderRadius: 40,alignItems: "center",marginLeft: 6}} onPress={()=>handleSend()}>
    <Ionicons
    name="send"
    size={18}
    color="white"/>
    </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black'
  }
});
