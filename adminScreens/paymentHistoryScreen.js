import React,{ useState,useEffect} from 'react';
import { logoutAdmin } from '../redux/actions';
import {connect} from "react-redux"
import {View, StyleSheet,Text,TouchableOpacity, Image,Pressable} from 'react-native';
import moment from 'moment'

function PaymentHistory(props){

  const [user, setUser] = useState(props.route.params.users.find(user=>user._id==props.route.params.item.userId))
  const item=props.route.params.item

  const signout = async () => {
      props.logoutAdmin()
      props.navigation.replace("Auth")
  }

    return (
      <View style={{backgroundColor: "white",flex:1}}>
          <View style={{flexDirection: "row",alignItems: "center",padding: 20}}>
          <Image source={{uri: "http://10.113.60.188:5000/upload/"+user.imageUri}} style={{width:60,height: 60,borderRadius: 50}}/>
          <Text style={{color: "black",fontSize:20,marginLeft: 15}}>{user.name}</Text>
          </View>
          <Text style={{fontSize:20,textAlign: "center"}}>Transactions</Text>
          <Text style={{fontSize:18,margin:10}}>Name:</Text>
          <Text style={{fontSize:18,borderWidth:1,borderColor: "black",padding: 5,paddingLeft: 10}}>{user.name}</Text>
          <Text style={{fontSize:18,margin:10}}>Invoice ID:</Text>
          <Text style={{fontSize:18,borderWidth:1,borderColor: "black",padding: 5,paddingLeft: 10}}>{item._id}</Text>
          <Text style={{fontSize:18,margin:10}}>Amount:</Text>
          <Text style={{fontSize:18,borderWidth:1,borderColor: "black",padding: 5,paddingLeft: 10}}>{item.amount} {item.currency}</Text>
          <Text style={{fontSize:18,margin:10}}>Time:</Text>
          <Text style={{fontSize:18,borderWidth:1,borderColor: "black",padding: 5,paddingLeft: 10}}>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Text>
          <Pressable style={{borderWidth:1,borderColor: "black",padding: 10,margin:20,borderRadius: 10,justifyContent: "center"}} onPress={()=>console.log("Refund")}><Text style={{textAlign: "center"}}>Refund</Text></Pressable>
      </View>
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

  }
}
export default connect(mapState,{})(PaymentHistory)