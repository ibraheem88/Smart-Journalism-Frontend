import React,{useEffect,useState} from 'react';
import {View,Text,Modal,Dimensions,Pressable} from 'react-native';


export default PopUpMenu=React.forwardRef((props,ref)=>{

  const deletePost=async()=>{
    await fetch('http://10.113.60.188:5000/deletePost',{
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "_id": props.post._id,
          "image": props.post.image
      })
    }).then(()=>{
      console.log("Post Deleted")
      props.onTouchOutside()}
    ).catch(err=>console.log(err))
  }

  const sendReport=async(data)=>{
    console.log(data)
    await fetch('http://10.113.60.188:5000/newReport',{
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "postId": props.post._id,
          "image": props.post.image,
          "reportedBy": props.user._id,
          "forgery": data
      })
    }).then(()=>{
      console.log("Report Sent")
      props.onTouchOutside()}
    ).catch(err=>console.log(err))
  }

  const reportPost=async()=>{
    alert("Reported")
    props.onTouchOutside()
  }

    return (
        <Modal
        ref={ref}
        animationType='fade'
        visible={props.show}
        transparent={true}
        onRequestClose={props.onTouchOutside}
         >
        <View style={{flex:1,justifyContent:"flex-end",alignItems:"center",backgroundColor:'rgba(255,255,255,0.5)'}}>
          <Pressable style={{height:'100%',width: "100%"}} onPress={props.onTouchOutside}>
          </Pressable>
          <View style={{backgroundColor: "#FFFFFF",width: '100%',justifyContent: "center",alignItems:"center",height: Dimensions.get('window').height*0.3,borderTopRightRadius:10,borderTopLeftRadius:10}}> 
          {props.post.postedBy!=props.user._id ? <Pressable style={{padding: 8,marginBottom: 10,backgroundColor: "lightgrey",width: '80%',alignItems: "center",borderRadius: 10}} onPress={()=>reportPost()}>
            <Text style={{fontSize:22}}>Report</Text>
          </Pressable>
          :
          <Pressable style={{padding: 8,marginBottom: 10,backgroundColor: "lightgrey",width: '80%',alignItems: "center",borderRadius: 10}} onPress={()=>deletePost()}>
            <Text style={{fontSize:22}}>Delete Post</Text>
          </Pressable> }
          {props.post.postedBy == props.user._id &&
            <Pressable style={{padding: 8,backgroundColor: "lightgrey",width: '80%',alignItems: "center",borderRadius: 10}} onPress={()=>{props.onTouchOutside()
            ;props.navigation.navigate("SentimentAnalysis",{post: props.post})}}>
            <Text style={{fontSize:22}}>Perform Sentiment Analysis</Text>
          </Pressable>
          }
          </View>
        </View>
        </Modal>
    );
})

