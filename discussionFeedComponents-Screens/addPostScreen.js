import React,{ useState,useEffect } from 'react';
import { Text, View,Image,ScrollView,FlatList,TouchableOpacity,Button,TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Ionicons} from "react-native-vector-icons"
import PlaybackButton from '../components/playbackButton';

export default function AddPostScreen(props){

  let videoRef=React.useRef()
  const [text, setText] = useState('');
  const [image, setImage] = useState();
  const [video, setVideo] = useState()

  useEffect(() => {
    props.navigation.setOptions({
    headerTitleStyle: {fontWeight: "bold"},headerLeft: ()=>(<Ionicons name="close-outline" size={40} style={{marginLeft: 15}} onPress={()=>props.navigation.goBack()
}/>),headerRight: ()=>(<View style={{marginRight: 10}}>{(text!=='' || image || video) && <Button title={"Next"} onPress={()=>props.navigation.navigate("Publish Post",{image: image,video: video,user: props.route.params.user})} />}</View>),gestureEnabled: false
  })
  })

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('blur', () => {
      //Every time the screen loses focus the Video is paused
      if(videoRef.current){
      videoRef.current.reset()
      }
      
    });

    return unsubscribe;
  },[props.navigation])

  const handleText = (text) => {
    setText(text);
  };

  const getMedia = async () => {
    const permissions=await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissions.status !== 'granted') {
      alert('Permission for gallery not granted!');
      return;
    }
    try{
    const result =await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    })
    if(result.type=='image'){
      setImage(result.uri)
    }
    if(result.type=='video'){
      setVideo(result.uri)
    }
    } catch (err) {
      console.log(err);
    }

  };



  return (
    <ScrollView style={{flex: 1,backgroundColor: "white"}}>
                <TextInput
            placeholder="Write a caption..."
            placeholderTextColor="grey"
            style={{
              width: '95%',
              marginTop: 30,
              height: image ? 100 : 200,
              paddingHorizontal: 10,
              alignSelf: "center",
              fontSize: 17,
              color: 'black'
            }}
            multiline
            onChangeText={(text)=>handleText(text)}
            value={text}
          />
          {image && <Image
            source={{ uri: image }}
            style={{ width: "100%", height: 400,marginTop: 20,alignSelf: "center"}}
          />}
          {video && <PlaybackButton source={{uri: video}} size={400} ref={videoRef}/>}
          <TouchableOpacity
          style={{width: 150,
          backgroundColor: "black",
          borderWidth: 1,
          justifyContent: "center",
          alignSelf: "center",
          margin: 5,
          borderRadius: 20,
          height: 50,
          marginVertical: 35}}
          onPress={()=>getMedia()}
      >
      <Text style={{  color: "white",
  textAlign: "center"}}>Add Photo/Video</Text>
  </TouchableOpacity>
    </ScrollView>
  )
}
