import React,{ useState,useEffect} from 'react';
import { Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {connect} from "react-redux"
import {View, StyleSheet,Text,FlatList,RefreshControl,Platform,TouchableOpacity, Image,ScrollView} from 'react-native';
import Article from '../newsFeedComponents-Screens/articleComponent';


function ArticleScreen(props){

  const [user, setUser] = useState(props.user);
  const [users, setUsers] = useState(props.users)
  const [articles, setArticles] = useState(null);
  const [show, setShow] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const refresh=()=>{
    setRefreshing(true)
    getArticles().then(() => {
      setRefreshing(false);
    });
}

let popup=React.useRef()

const toggleModal=()=>{
  setShow(!show)
}

useEffect(()=>{
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

    return (
          <FlatList
      refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={()=>refresh()} />
        }
    style={{backgroundColor: "white"}}
    data={articles}
    keyExtractor={(item)=>item._id}
    renderItem={({item})=>{if(item.postedBy == user._id)
    return(
        <View>
    <PopUpSubscription ref={popup} show={show} onTouchOutside={()=>toggleModal()} navigation={props.navigation} user={user}/>
    <Article article={item} navigation={props.navigation} user={user} users={users} key={item}/>
    </View>)
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
export default connect(mapState)(ArticleScreen)