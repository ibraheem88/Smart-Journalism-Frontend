import React,{ useState,useEffect }from 'react';
import { Text, View, FlatList, TouchableOpacity} from 'react-native';
import {connect} from "react-redux"
import ChatListItem from "../components/ChatListItem"



function Chats(props){
  
  const [currentUser, setCurrentUser] = useState(props.user)
  const [users, setUsers] = useState(props.users)


  let user=Object.values(users)
  let filteredUsers=user.filter((item)=>
    item._id !== currentUser._id)
  return (
    <View style={{flex: 1,backgroundColor: "white"}}>
    <FlatList 
    data={filteredUsers}
    keyExtractor={(item)=>item._id}
    renderItem={({item})=> <ChatListItem chatRoom={item} navigation={props.navigation} currentUser={currentUser}/>}
    />
    </View>
  )
}

const mapState=state=>{
  return {
    user: state.user.user,
    users: state.user.users
  }
}
export default connect(mapState)(Chats)
