import React,{ useState,useEffect,useRef} from 'react';
import { Ionicons } from '@expo/vector-icons';
import {View, StyleSheet,Text,FlatList,RefreshControl,Platform,TouchableOpacity, Image} from 'react-native';
import Post from "../discussionFeedComponents-Screens/post"



export default function VisitingProfileScreen(props){

  const [user, setUser] = useState(props.route.params.user);
  const [userInfo, setUserInfo] = useState(props.route.params.userInfo[0]);
  const [isFollowing, setIsFollowing] = useState(props.route.params.user.following.indexOf(props.route.params.userInfo[0]._id)>-1);
  const [following, setFollowing] = useState(props.route.params.user.following);
  const [users, setUsers] = useState(props.route.params.users)
  const [posts, setPosts] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const firstTimeRender = useRef(true);

useEffect(() => {
  if (!firstTimeRender.current) {
    handleFollow()
  }   
  }, [following])

  useEffect(() => { 
    firstTimeRender.current = false
  }, [])

  const refresh=()=>{
    setRefreshing(true)
    getPosts().then(() => {
      setRefreshing(false);
    });
}

const header=()=>(
  <View>
  <View style={{borderBottomColor:"grey",paddingVertical: 15,borderBottomWidth: 1}}>
  <Image source={{uri: "http://10.113.60.188:5000/upload/"+userInfo.imageUri}} style={{width:150,height: 150,borderRadius: 75,alignSelf: "center",resizeMode: "cover"}}/>
  {user._id!=userInfo._id && <TouchableOpacity
      style={{width: 100,
          borderWidth: 1,
          justifyContent: "center",
          alignSelf: "center",
          margin: 5,
          borderRadius: 5,
          height: 50,
          marginTop: 35}}
          onPress={()=>updateFollow()}
      >
      <Text style={{alignSelf: "center"}}>{isFollowing ? "Following" : "Follow"}</Text>
  </TouchableOpacity>}
  </View>
  <View style={{padding:15}}>
  <View style={{flexDirection: "row",alignItems: "center",marginBottom:20}}>
  <Ionicons name={'person-outline'} size={20} color="black" />
  <Text style={{color: "black",fontWeight:"500",fontSize:18,marginLeft:15}}>{userInfo.name}</Text>
  </View>
  <View style={{flexDirection: "row",alignItems: "center",marginBottom:20}}>
  <Ionicons name={'briefcase-outline'} size={20} color="black" />
  <Text style={{color: "black",fontWeight:"500",fontSize:18,marginLeft:15}}>Works At Sky News</Text>
  </View>
  <View style={{flexDirection: "row",alignItems: "center",marginBottom:20}}>
  <Ionicons name={'school-outline'} size={20} color="black" />
  <Text style={{color: "black",fontWeight:"500",fontSize:18,marginLeft:15}}>Studied at King Martin University</Text>
  </View>
  <View style={{flexDirection: "row",alignItems: "center",marginBottom:20}}>
  <Ionicons name={'location-outline'} size={20} color="black" />
  <Text style={{color: "black",fontWeight:"500",fontSize:18,marginLeft:15}}>From Sydney</Text>
  </View>
  </View>
  </View>
)

  const getPosts=async ()=>{
    fetch('http://10.113.60.188:5000/posts').then(
      res=>res.json())
    .then((data)=>{
      if(data)setPosts(data.reverse())}
      )
    .catch(err=>console.log(err))
}

const updateFollow=()=>{
  isFollowing ? setFollowing(following.filter((following) =>  following !== userInfo._id)) : setFollowing(following=>[...following,userInfo._id])
  setIsFollowing(!isFollowing)
}

const handleFollow=async()=>{
  await fetch('http://10.113.60.188:5000/follow',{
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "_id": user._id,
        "following": following
    })
  }).then(
    console.log("Followed "+userInfo.name)
  ).catch(err=>console.log(err))
}

  useEffect(() => {
    getPosts() 
  },[])

    return (
          <FlatList
      refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={()=>refresh()} />
        }
    style={{backgroundColor: "white"}}
    data={posts}
    keyExtractor={(item)=>item._id}
    renderItem={({item})=>{if(item.postedBy == userInfo._id)
    return(
    <Post post={item} navigation={props.navigation} user={user} users={users}/>)
    }}
    ListHeaderComponent={()=>header()}
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