import React,{ useState,useEffect } from 'react';
import { Text,FlatList,TouchableOpacity,StyleSheet,RefreshControl,Platform,View } from 'react-native';
import { updateUser } from '../redux/actions';
import {connect} from "react-redux"
import Post from "./post"


function DiscussionFeed(props){

  const getHeader = () => {
    if(user.type=='publisher'){
      if(user.approved)
      return ( <TouchableOpacity
        style={{width: 100,
            backgroundColor: "black",
            borderWidth: 1,
            justifyContent: "center",
            alignSelf: "center",
            margin: 5,
            borderRadius: 20,
            height: 50,
            marginTop: 35}}
            onPress={()=>props.navigation.navigate("Add Post",{user: user})}
        >
        <Text style={styles.btnText}>Post News</Text>
    </TouchableOpacity>)
   }
    };
  
    const [user, setUser] = useState(props.user);
    const [users, setUsers] = useState(props.users)
    const [posts, setPosts] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
  
    const refresh=()=>{
      setRefreshing(true)
      getPosts().then(() => {
        getData()
        setRefreshing(false);
      });
  }
  
  
  
  useEffect(() => {
      getPosts()
    },[])

  
    const getPosts=async ()=>{
          fetch('http://10.113.60.188:5000/posts').then(
            res=>res.json())
          .then((data)=>{
            if(data)setPosts([...data.reverse()])}
            )
          .catch(err=>console.log(err))
    }
  
    const getData=async()=>{
      fetch('http://10.113.60.188:5000/currentUser',{
        headers:new Headers({
            Authorization:"Bearer "+props.token
        })
    }).then(
        res=>res.json())
      .then((data)=>{setUser(data)
      props.updateUser(data)})
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
      renderItem={({item})=>
      <View>
      <Post post={item} navigation={props.navigation} user={user} users={users} key={item}/>
      </View>
      }
      ListHeaderComponent={getHeader()}
      />
    )
  }
  
  const styles=StyleSheet.create({
      input: {
      borderRadius: 25,
      fontSize: 15,
      borderWidth: 1,
      margin: 5,
      padding: 15,
    },
    button:{
      backgroundColor: "black",
      marginTop: 20,
      borderRadius: 25,
      fontSize: 20,
      borderWidth: 1,
      margin: 5,
      padding: 10,
      shadowColor: "black"
  },
  btnText:{
    color: "white",
    textAlign: "center"
  },
    container: {
      padding: 20,
      justifyContent: 'center',
    },
  
  })
  
  const mapState=state=>{
    return {
      user: state.user.user,
      token: state.user.token,
      users: state.user.users
    }
  }
  export default connect(mapState,{updateUser})(DiscussionFeed)