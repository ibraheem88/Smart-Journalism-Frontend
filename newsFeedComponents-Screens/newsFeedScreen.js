import React,{ useState,useEffect } from 'react';
import { Text,FlatList,TouchableOpacity,StyleSheet,RefreshControl,Platform,View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { updateUser } from '../redux/actions';
import {connect} from "react-redux"
import Article from './article';
import PopUpSubscription from './popUpSubscription';


function Home(props){

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
          onPress={()=>props.navigation.navigate("Add Article",{user: user})}
      >
      <Text style={styles.btnText}>Post News</Text>
  </TouchableOpacity>)
 }
  };

  const [user, setUser] = useState(props.user);
  const [users, setUsers] = useState(props.users)
  const [articles, setArticles] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [show, setShow] = useState(false);

  const refresh=()=>{
    setRefreshing(true)
    getArticles().then(() => {
      getData()
      setRefreshing(false);
    });
}



useEffect(() => {
    registerForPushNotificationsAsync()
    getArticles()
    if(user.subscription == 'none'){
    toggleModal()
    }
  },[])

  let popup=React.useRef()

  const toggleModal=()=>{
    setShow(!show)
  }

  

  const registerForPushNotificationsAsync=async()=> {
    let token
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      fetch('http://10.113.60.188:5000/updateToken',{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          "id": user._id,
          token: token
        })
      }).then(
        res=>res.json())
      //.then((data)=>{
      //  if(data)this.setState({lastMessage: data})}
      //  )
      .catch(err=>console.log(err))
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        sound: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

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
    renderItem={({item})=>
    <View>
    <PopUpSubscription ref={popup} show={show} onTouchOutside={()=>toggleModal()} navigation={props.navigation} user={user}/>
    <Article article={item} navigation={props.navigation} user={user} users={users} key={item}/>
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
export default connect(mapState,{updateUser})(Home)