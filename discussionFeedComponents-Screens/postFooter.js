import React,{useState,useEffect,useRef} from 'react';
import { Text, View,Image,ScrollView,TouchableOpacity,Pressable} from 'react-native';
import {Ionicons} from "react-native-vector-icons"
import moment from 'moment'
import PopUpLikes from '../discussionFeedComponents-Screens/popUpLikes';


export default function Footer(props){

const [likes, setLikes] = useState(parseInt(props.post.likedBy.length))
const [likedBy, setLikedBy] = useState(props.post.likedBy)
const [isLiked, setIsLiked] = useState(props.post.likedBy.indexOf(props.user._id) > -1)
const firstTimeRender = useRef(true)
const [show, setShow] = useState(false);

useEffect(() => {
  if (!firstTimeRender.current) {
    handleLiked()
  }   
  }, [likedBy])

  useEffect(() => { 
    firstTimeRender.current = false
  }, [])

  let popup=React.useRef()

  const toggleModal=()=>{
    setShow(!show)
  }

const sendLikeNotification=async()=>{
  await fetch('http://10.113.60.188:5000/likeNotification',{
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "_id": props.post._id,
        "postedBy": props.post.postedBy,
        "userName": props.user.name,
        "userImage": props.user.imageUri,
        "likes": likes,
        "type": "post"
    })
  }).then(res=>res.json()).then((data)=>
    console.log(data)
  ).catch(err=>console.log(err))
}

const handleLiked=async()=>{
  await fetch('http://10.113.60.188:5000/like',{
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "_id": props.post._id,
        "likedBy": likedBy
    })
  }).then(()=>
    console.log("Post Liked")
  ).then(()=>(isLiked && sendLikeNotification())).catch(err=>console.log(err))
}

const updateLikes=()=>{
  isLiked ? setLikedBy(likedBy.filter((likedBy) =>  likedBy !== props.user._id)) : setLikedBy(likedBy=>[...likedBy,props.user._id])
  isLiked ? setLikes(likes-1) : setLikes(likes+1)
  setIsLiked(!isLiked)

}
  
  return (
      <View style={{paddingBottom: 13,borderBottomWidth: 5,borderBottomColor: "#D3D3D3"}}>

      <View style={{marginLeft: 13}}>
      <View style={{flexDirection: "row",justifyContent: "space-between",paddingRight: 20}}>
      <Pressable  onPress={()=>toggleModal()}>
        <Text style={{fontWeight: "600",fontSize: 14}}>{likes} likes</Text>
      </Pressable>
      <Text style={{fontWeight: "600",fontSize: 14}}>{props.post.comments.length} comments</Text>
      </View>
      <View style={{flexDirection: "row",alignItems: "flex-start",paddingTop: 10}}>
      <TouchableOpacity onPress={()=>updateLikes()} >
      {isLiked ? <Ionicons name={"heart"} size={26} color="red" /> :
      <Ionicons name={"heart-outline"} size={26}/>
      }
      </TouchableOpacity>
      <Ionicons name={"chatbubble-outline"} size={25} style={{marginLeft: 20}} onPress={()=>props.navigation.navigate("Comments",{post: props.post,user:props.user})}/>
      <Ionicons name={"paper-plane-outline"} size={25} style={{marginLeft: 20}}/>
      <View style={{flex: 1,alignItems: "space-between"}}>
      <Ionicons name={"bookmark-outline"} size={25} style={{paddingRight: 20}}/>
      </View>
      </View>
      <View style={{flexDirection: "coloumn",marginVertical:6,marginRight:13}}>
      <Text style={{fontWeight: "600",fontSize: 14,marginBottom:8}}>{props.post.authorName} </Text>
      <Text style={{textAlign: "justify",flexShrink:1}}>{props.post.text}</Text>
      </View>
      <Text style={{color: "grey",paddingTop: 6}}>{moment(props.post.createdAt).fromNow()}</Text>
      <PopUpLikes ref={popup} show={show} onTouchOutside={()=>toggleModal()} users={props.users} likedBy={props.post.likedBy}/>
      </View>
      </View>
  )
}