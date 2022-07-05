import React,{ useState,useEffect } from 'react';
import { TextInput, View, StyleSheet, ScrollView, Button ,Text,ActivityIndicator,TouchableOpacity,Image} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { login } from '../redux/actions';
import {connect} from "react-redux"


function Login(props){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    checktoken()
  },[props.token,props.adminToken,props.advertiserToken]);

const checktoken=()=>{
  if(props.token){
    props.navigation.replace('MainTabs')
  }
  if(props.adminToken){
  props.navigation.replace('AdminTabs') 
  }
  if(props.advertiserToken){
    props.navigation.replace('AdvertiserTabs') 
    }
}

const handleEmail = (email) => {
  setEmail(email);
};
const handlePassword = (password) => {
  setPassword(password);
};

const  login=()=>{
  props.login(email,password)
  if(props.error)
  alert(props.error)
}

    return (
      <View style={{backgroundColor: "white",flex: 1,justifyContent:"center"}}>
              <Image style={{flex:1,resizeMode: "cover",opacity: 0.6,backgroundColor: "#b5e2ff"}} source={{uri: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"}} />
      <View style={{alignSelf: "center",position:"absolute",top:80}}>
       <Ionicons name="log-in-outline" size={65} color={"black"} />
       <Text style={{color: "black",fontSize: 40}}>Login</Text>
      </View>

       <View style={styles.row}>
      
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(email)=>handleEmail(email)}
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(password)=>handlePassword(password)}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={()=>login() }
        ><Text style={styles.btnText}>Log In</Text></TouchableOpacity>
        <View style={{flexDirection: "row",margin: 25,alignItems: "center"}}>
        <Text>Donot have an account?</Text>
         <TouchableOpacity style={{marginLeft: 15}} onPress={()=>props.navigation.navigate("Register As") }>
          <Text style={{color: "black",fontSize: 20}}>Register</Text> 
        </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
          style={{
          borderRadius: 12,
          fontSize: 20,
          position: "absolute",
          right:0,
          left:0,
          top:520,
          alignSelf:"center",
          borderWidth:1,
          borderColor: "black",
          marginHorizontal: 30,
          padding: 10,
          shadowColor: "black"}}
          onPress={()=>props.navigation.navigate("Admin Login") }
        ><Text style={{color: "black",textAlign: "center"}}>Log In As Admin</Text></TouchableOpacity>
              <TouchableOpacity
          style={{
          borderRadius: 12,
          fontSize: 20,
          position: "absolute",
          right:0,
          left:0,
          top:580,
          alignSelf:"center",
          borderWidth:1,
          borderColor: "black",
          marginHorizontal: 30,
          padding: 10,
          shadowColor: "black"}}
          onPress={()=>props.navigation.navigate("Advertiser Login") }
        ><Text style={{color: "black",textAlign: "center"}}>Log In As Advertiser</Text></TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
  row: {
    position: "absolute",
    right:0,
    padding: 20,
    left:0,
    top: 240,
    alignSelf:"center"
  },
  input: {
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
    margin: 5,
    padding: 15,
  },
  button:{
    backgroundColor: "black",
    marginTop: 20,
    borderRadius: 12,
    fontSize: 20,
    borderWidth: 1,
    margin: 5,
    padding: 10,
    shadowColor: "black"
},
btnText:{
  color: "white",
  textAlign: "center"
}
});

const mapState=state=>{
  return {
    err: state.user.error,
    token: state.user.token,
    adminToken: state.user.adminToken,
    advertiserToken: state.user.advertiserToken
  }
}
export default connect(mapState,{login})(Login)