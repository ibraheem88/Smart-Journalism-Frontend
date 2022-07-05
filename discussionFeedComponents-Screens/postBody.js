import React,{ useEffect } from 'react';
import { Text, View,Image,Dimensions, Pressable } from 'react-native';
import PlaybackButton from '../components/playbackButton';


export default function Body(props){

  let videoRef=React.useRef()

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('blur', () => {
      //Every time the screen loses focus the Video is paused
      if(videoRef.current){
      videoRef.current.reset()
      }
      
    });

    return unsubscribe;
  },[props.navigation])

  return (
      <Pressable style={{marginBottom: 10}} onPress={()=>{if(props.post.type)props.navigation.navigate("Article",{post:props.post})}}>
      {props.post.image!='null' ? <Image source={{uri: "http://10.113.60.188:5000/upload/posts/"+props.post.image}} style={{width: Dimensions.get('window').width,height: Dimensions.get('window').width}}/>
      : <PlaybackButton source={{uri: "http://10.113.60.188:5000/upload/posts/"+props.post.video}} size={400} ref={videoRef}/>}
      </Pressable>
  )
}