import React,{ useState,useEffect } from 'react';
import { TextInput, View, StyleSheet, ScrollView, Button ,Image,Text,TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { adminLogin } from '../redux/actions';
import {connect} from "react-redux"


function adminLoginScreen(props){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


const handleEmail = (email) => {
  setEmail(email);
};
const handlePassword = (password) => {
  setPassword(password);
};

const  login=()=>{
  props.adminLogin(email,password)
  if(props.error)
  alert(props.error)
  }

    return (
      <View style={{backgroundColor: "white",flex: 1}}>
        <Image style={{flex:1,resizeMode: "cover",opacity: 0.6,backgroundColor: "#b5e2ff"}} source={{uri: "https://images.unsplash.com/photo-1631624210938-539575f92e3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}} />
      <View style={{alignSelf: "center",marginTop:20,top:80,position:"absolute",alignItems:"center"}}>
       <Ionicons name="log-in-outline" size={65} color={"black"} />
       <Text style={{color: "black",fontSize: 40}}>Admin Login</Text>
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
      </View>
      </View>
    )
}

const styles = StyleSheet.create({
  row: {
    flex:1,
    right:0,
    left:0,
    top:230,
    position:"absolute",
    padding: 20,
    alignSelf: 'center',
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
})

const mapState=state=>{
  return {
    error: state.user.error
  }
}
export default connect(mapState,{adminLogin})(adminLoginScreen)