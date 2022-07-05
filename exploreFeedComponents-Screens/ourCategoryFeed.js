import React,{ useState,useEffect } from 'react';
import { Text,FlatList,TouchableOpacity,StyleSheet,RefreshControl,Platform,View } from 'react-native';
import { updateUser } from '../redux/actions';
import {connect} from "react-redux"
import Article from '../newsFeedComponents-Screens/articleComponent';

function OurSearchFeed(props){

  const [user, setUser] = useState(props.user);
  const [users, setUsers] = useState(props.users)
  const [articles, setArticles] = useState(null);
  const [refreshing, setRefreshing] = useState(false)

  const refresh=()=>{
    setRefreshing(true)
    getArticles().then(() => {
      getData()
      setRefreshing(false);
    });
}

useEffect(() => {
    getArticles()
  },[])

  const getArticles=async ()=>{
        fetch('http://10.113.60.188:5000/articles').then(
          res=>res.json())
        .then((data)=>{
          if(data)setArticles([...data.reverse()])
          }
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
    data={articles}
    keyExtractor={(item)=>item._id}
    renderItem={({item})=>{if(item.category == "Travel")
    return(
    <View>
    <Article article={item} navigation={props.navigation} user={user} users={users} key={item}/>
    </View>)
    }}
    />
  )
}

const mapState=state=>{
  return {
    user: state.user.user,
    token: state.user.token,
    users: state.user.users
  }
}
export default connect(mapState,{updateUser})(OurSearchFeed)