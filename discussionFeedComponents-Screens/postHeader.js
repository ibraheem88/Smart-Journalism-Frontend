import React,{ useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import ProfilePhoto from "./profilePhoto"
import {Ionicons} from "react-native-vector-icons"
import PopUpMenu from '../discussionFeedComponents-Screens/popUpMenu';


export default function Header({post,user,navigation,users}) {

  const [show, setShow] = useState(false);

  let popup=React.useRef()

  const toggleModal=()=>{
    setShow(!show)
  }

  return (
      <View style={{flexDirection: "row",alignItems: 'center',marginLeft: 10}}>
      <Pressable onPress={()=>navigation.navigate("VisitingProfile",{userInfo: users.filter(user=>user._id==post.postedBy),users: users,user: user})} style={{flexDirection: "row",alignItems: "center"}}>
      <ProfilePhoto uri={post.authorImage} size={30}/>
      <Text style={{fontWeight: "600",fontSize: 13}}>{post.authorName}</Text>
      </Pressable>
      <View style={{alignItems: 'flex-end',flex: 1}}>
      <Ionicons name="ellipsis-horizontal" size={22} style={{marginRight: 10}} onPress={()=>toggleModal()} />
      <PopUpMenu ref={popup} onTouchOutside={()=>toggleModal()} show={show} post={post} user={user} navigation={navigation}/>
      </View>
      </View>
  );
}