import React,{ useState,useEffect} from 'react';
import { Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {connect} from "react-redux"
import {View, StyleSheet,Text,FlatList,RefreshControl,Platform,TouchableOpacity, Image,ScrollView} from 'react-native';
import Post from "../discussionFeedComponents-Screens/post"


function PostScreen(props){

  const [user, setUser] = useState(props.user);
  const [users, setUsers] = useState(props.users)
  const [posts, setPosts] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const refresh=()=>{
    setRefreshing(true)
    getPosts().then(() => {
      setRefreshing(false);
    });
}

useEffect(()=>{
  getPosts()
},[])

  const getPosts=async ()=>{
    fetch('http://10.113.60.188:5000/posts').then(
      res=>res.json())
    .then((data)=>{
      if(data)setPosts(data.reverse())}
      )
    .catch(err=>console.log(err))
}

    return (
          <FlatList
      refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={()=>refresh()} />
        }
    style={{backgroundColor: "white"}}
    data={posts}
    keyExtractor={(item)=>item._id}
    renderItem={({item})=>{if(item.postedBy == user._id)
    return(
    <Post post={item} navigation={props.navigation} user={user} users={users}/>)
    }}
    />
    );
  }

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    width: '50%',
    borderColor: "black",
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 2,
    marginVertical: 20
  }
});

const mapState=state=>{
  return {
    user: state.user.user,
    users: state.user.users
  }
}
export default connect(mapState)(PostScreen)